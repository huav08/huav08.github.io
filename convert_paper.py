import re
import os

import logging
logging.basicConfig(filename='debug_log.txt', level=logging.DEBUG)

file_path = r"d:\Dev\soft\GitHub\huav08.github.io\download_paper.html"
logging.info(f"Starting conversion for {file_path}")

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    logging.info(f"Read {len(content)} bytes")
except Exception as e:
    logging.error(f"Failed to read file: {e}")
    exit()

# 1. Add CSS/JS Links if not present
swiper_css = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />'
if swiper_css not in content:
    content = content.replace('<!-- Webflow Slider CSS -->', '') 
    content = content.replace('<link rel="stylesheet" href="css/easyzoom.css" />', 
                              '<link rel="stylesheet" href="css/easyzoom.css" />\n    ' + swiper_css + '\n    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic%7COswald:200,300,400,500,600,700" media="all">')

# 2. Extract Table Rows
row_pattern = re.compile(r'<tr>(.*?)</tr>', re.DOTALL)
matches = row_pattern.findall(content)

slides_html = []
menu_html = []

# Title Menu Item (Static)
menu_html.append('''
                            <div class="menu-item-container" style="cursor: default; opacity: 1;">
                                <div class="menu-item-pointer-container">
                                    <div class="menu-pointer-number" style="visibility: hidden;">00</div>
                                    <div class="menu-pointer-line" style="visibility: hidden;"></div>
                                </div>
                                <div class="menu-item-text-container">
                                    <div class="menu-item-text title">研究發表 (Research)</div>
                                </div>
                            </div>
''')

slide_index = 0
for match in matches:
    # Skip Header or Pagination rows based on content
    if '標題' in match and '作者' in match: continue
    if 'id="table_page"' in match: continue 
    
    # Remove HTML comments to avoid false matches
    clean_match = re.sub(r'<!--.*?-->', '', match, flags=re.DOTALL)
    
    # Parse columns
    td_pattern = re.compile(r'<td.*?>(.*?)</td>', re.DOTALL)
    cols = td_pattern.findall(clean_match)
    
    # After cleaning comments, we expect:
    # 0: Img
    # 1: Title
    # 2: Author
    # 3: Location
    # 4: Download Link
    
    if len(cols) < 5: continue 
    
    title_raw = cols[1].strip()
    author_raw = cols[2].strip()
    loc_raw = cols[3].strip()
    dl_col = cols[4].strip()

    title_text = re.sub(r'<[^>]+>', '', title_raw).strip()
    
    # Extract Download Link
    href_match = re.search(r'href="(.*?)"', dl_col)
    # Handle cases where href might be inside single quotes or mismatched
    if not href_match:
        href_match = re.search(r"href='(.*?)'", dl_col)
    
    link = href_match.group(1) if href_match else "#"
    
    icon_img = "./images/icon_pdf.svg"
    
    slide_num = f"{slide_index + 1:02d}"
    
    # Generate Slide
    slide = f'''
                            <!-- Slide {slide_num} -->
                            <div class="swiper-slide _{slide_index + 1}">
                                <div class="slide-number">{slide_num}</div>
                                <div class="bg-text">Research</div>
                                <div class="slide-item-text">
                                    <div class="paper-info-scroll">
                                        <h3 class="paper-title">{title_text}</h3>
                                        <div class="paper-details">
                                            <p class="paper-author">{author_raw}</p>
                                            <p class="paper-loc">{loc_raw}</p>
                                        </div>
                                    </div>
                                    <a href="{link}" target="_blank" class="slide-link">
                                        <img src="{icon_img}" width="50" style="margin-bottom: 2px;">
                                        <span class="dl-btn">下載全文</span>
                                    </a>
                                </div>
                            </div>
    '''
    slides_html.append(slide)

    # Generate Menu Item
    menu_title = title_text
    # Simplified truncation logic
    if len(menu_title) > 18:
        menu_title = menu_title[:18] + "..."
        
    menu_item = f'''
                            <div class="menu-item-container" onclick="slideTo({slide_index})">
                                <div class="menu-item-pointer-container">
                                    <div class="menu-pointer-number">{slide_num}</div>
                                    <div class="menu-pointer-line"></div>
                                </div>
                                <div class="menu-item-text-container">
                                    <div class="menu-item-text">{menu_title}</div>
                                </div>
                            </div>
    '''
    menu_html.append(menu_item)
    
    slide_index += 1

print(f"Parsed {slide_index} slides.")

if slide_index == 0:
    print("No slides found. Aborting file write to prevent data loss.")
    exit()

# Construct New Section
new_section = '''
           <div class="copyBasic">
              <!-- Swiper Structure Start -->
              <div class="section" style="padding: 0; background: transparent;">
                 <div class="container-content">
                     <!-- Slider Area -->
                     <div class="slides-container">
                         <div class="swiper mySwiper">
                             <div class="swiper-wrapper">
''' + "\n".join(slides_html) + '''
                             </div>
                         </div>
                     </div>
                     
                     <!-- Custom Side Menu -->
                     <div class="menu-container">
                         <div class="menu-wrapper" style="overflow-y: auto; max-height: 500px; padding-right: 10px;">
''' + "\n".join(menu_html) + '''
                         </div>
                     </div>
                 </div>
              </div>
              <!-- Swiper Structure End -->
           </div>
'''

# Replace content
# Identify the block to replace
start_marker = '<div class="copyBasic">'
end_marker = '</section>'

# Use more robust start index finding
# Look for <div class="copyBasic"> after titleBar_blue
title_ref = '<div class="titleBar_blue">'
idx_title = content.find(title_ref)
if idx_title != -1:
    idx_start = content.find(start_marker, idx_title)
else:
    idx_start = content.find(start_marker)

# Find end of section
idx_end = content.find(end_marker, idx_start)

if idx_start != -1 and idx_end != -1:
    # Find the closing div of copyBasic just before </section>
    # The original has 
    #   <table ... </table> 
    # </div> </section>
    # So we can just take everything up to `</section>` and assume the last `</div>` is the one we want to close, 
    # OR simpler: replace everything from `idx_start` to `idx_end` with new_body + closing div if needed.
    
    # We want to replace `<div class="copyBasic">...content...</div>`.
    # `new_section` already includes `<div class="copyBasic">...</div>`.
    
    # We need to act carefully. The file has:
    # <div class="copyBasic">
    # ...
    # </div>
    # </section>
    
    # Let's verify if `idx_end` points to `</section>`.
    # We can replace `content[idx_start:idx_end]` with `new_section`?
    # BUT `content[idx_start:idx_end]` includes the closing `</div>` of copyBasic?
    # Yes, likely.
    
    # Let's replace.
    content = content[:idx_start] + new_section + "\n" + content[idx_end:]

# 3. Add CSS
style_block = '''
    <style>
    /* Swiper & Custom Styles */
    .swiper {
      width: 100%;
      padding-top: 50px;
      padding-bottom: 50px;
      overflow: visible;
    }

    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 300px;
      height: 480px; /* Taller for text */
      background-color: #fff;
      box-shadow: -7px 7px 20px 0 rgba(0,0,0,.25);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-radius: 5px;
    }
    
    .swiper-slide .slide-number {
        position: absolute;
        top: 10px;
        left: 20px;
        font-family: Oswald, sans-serif;
        font-size: 3rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        z-index: 5;
        pointer-events: none;
    }

    .bg-text {
        font-family: Oswald, sans-serif;
        color: rgba(220, 220, 220, 0.15);
        font-size: 4rem;
        font-weight: 700;
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 0;
        pointer-events: none;
    }

    .slide-item-text {
        position: relative;
        z-index: 2;
        text-align: center;
        padding: 20px 25px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
    }
    
    .paper-info-scroll {
        flex-grow: 1;
        overflow-y: auto;
        margin-top: 25px;
        margin-bottom: 10px;
        /* Scrollbar styles */
        padding-right: 5px;
    }
    
    .paper-info-scroll::-webkit-scrollbar {
        width: 4px;
    }
    .paper-info-scroll::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.3);
        border-radius: 2px;
    }

    .paper-title {
        font-size: 1.1rem;
        color: white;
        margin-bottom: 15px;
        font-weight: bold;
        line-height: 1.4;
        text-align: left;
    }
    
    .paper-details {
        font-size: 0.9rem;
        color: #eee;
        text-align: left;
    }
    
    .paper-author {
        margin-bottom: 8px;
        font-style: italic;
        color: #ddd;
    }
    
    .paper-loc {
        font-size: 0.85rem;
        color: #ccc;
    }

    .slide-link {
        color: white !important;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.3s;
        margin-top: 5px;
        flex-shrink: 0;
    }

    .slide-link:hover {
        transform: scale(1.05);
    }
    
    .dl-btn {
        font-size: 0.9rem;
        border: 1px solid rgba(255,255,255,0.6);
        padding: 4px 12px;
        border-radius: 20px;
        margin-top: 4px;
    }

    /* Gradient Backgrounds */
    .swiper-slide { background-image: linear-gradient(135deg, #a4c9dd, #6c9bb5); }

    /* Layout Adjustments */
    .section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        overflow: hidden; 
        min-height: 600px;
    }
    .container-content {
        display: flex;
        width: 100%;
        max-width: 1200px;
        position: relative;
        justify-content: space-between; 
        align-items: center;
    }
    .slides-container {
        width: 50%;
        padding-right: 0;
        overflow: visible; 
        transform: translateX(-25%);
    }
    
    /* Menu Styles */
    .menu-container {
        position: relative; 
        width: 320px;
        z-index: 50;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 20px;
        height: 500px; /* Fixed height for scroll */
    }

    .menu-item-container {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s;
    }

    .menu-item-container:hover, .menu-item-container.active {
        opacity: 1;
    }

    .menu-item-pointer-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 15px;
        width: 30px; 
    }

    .menu-pointer-number {
        font-family: Oswald, sans-serif;
        font-weight: 400;
        color: rgb(150, 150, 150);
        margin-bottom: 5px;
    }

    .menu-pointer-line {
        width: 1px;
        height: 30px; 
        background-color: #e0e0e0;
        transition: height 0.3s, background-color 0.3s;
    }

    .menu-item-text-container {
        font-family: Lato, sans-serif;
        font-size: 0.9rem;
        font-weight: 400;
        color: #666;
    }
    
    .menu-item-text.title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 15px;
        cursor: default;
    }

    .menu-item-container.active .menu-pointer-number {
        color: rgb(42, 105, 138); 
    }
    .menu-item-container.active .menu-pointer-line {
        background-color: rgb(42, 105, 138);
        height: 50px; 
    }
    
    .menu-item-container:hover .menu-pointer-number,
    .menu-item-container:hover .menu-item-text {
         color: #2a698a;
    }
    
    /* Scrollbar for menu wrapper */
    .menu-wrapper {
        padding-right: 10px;
    }
    .menu-wrapper::-webkit-scrollbar {
        width: 6px;
    }
    .menu-wrapper::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    .menu-wrapper::-webkit-scrollbar-thumb {
        background: #ccc; 
        border-radius: 3px;
    }
    .menu-wrapper::-webkit-scrollbar-thumb:hover {
        background: #aaa; 
    }

    @media (max-width: 768px) {
        .container-content {
            flex-direction: column;
        }
        .slides-container {
            width: 100% !important;
            padding-right: 0;
            transform: none !important;
            margin-left: 0 !important;
        }
        .swiper {
             padding-top: 20px;
             padding-bottom: 20px;
        }
        .swiper-slide {
            width: 280px;
            height: 400px;
        }
        .menu-container {
            display: none;
        }
    }
    </style>
'''
content = content.replace('</head>', style_block + '\n</head>')

# 4. Add JS
js_block = '''
    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: -50,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      },
      initialSlide: 0,
       mousewheel: {
        invert: false,
      },
      on: {
          slideChange: function () {
              updateActiveMenu(this.activeIndex);
              scrollToActiveMenu(this.activeIndex);
          }
      }
    });

    const menuItems = document.querySelectorAll('.menu-wrapper .menu-item-container');

    function slideTo(index) {
        swiper.slideTo(index);
    }

    function updateActiveMenu(activeIndex) {
        menuItems.forEach(item => item.classList.remove('active'));
        if (menuItems[activeIndex + 1]) {
            menuItems[activeIndex + 1].classList.add('active');
        }
    }
    
    function scrollToActiveMenu(activeIndex) {
        const activeItem = menuItems[activeIndex + 1];
        if (activeItem) {
            // Check if activeItem is visible in scroll view
            // Simple scrollIntoView is good
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    updateActiveMenu(0);
    </script>
'''

# Remove old scripts
content = re.sub(r'<script.*jquery-tablepage.*?</script>', '', content)
content = re.sub(r'<script>\s+\$\("#tbl"\)\.tablepage.*?</script>', '', content, flags=re.DOTALL)

content = content.replace('</body>', js_block + '\n</body>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Conversion complete. {slide_index} slides created.")
