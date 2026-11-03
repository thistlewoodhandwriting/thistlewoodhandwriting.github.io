"""Builds the bonus site pages (python3 build.py). Edit BOOK or ASIN here, then rebuild."""
import os, re, glob
BOOK='Handwriting Worth Signing'; AUTHOR='Emma R. Thistlewood'
ASIN='ASIN_PLACEHOLDER'   # set to the paperback ASIN once the book is live
REVIEW=f'https://www.amazon.com/review/create-review?asin={ASIN}'
ARROW='<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
OUT='<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/></svg>'
DOWN='<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>'
ICON="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='15' fill='%238a4a36'/%3E%3Cpath d='M9 21c3-1 5-9 7-11s3 1 1 5-3 7 0 7 4-4 6-6' fill='none' stroke='%23fff' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E"
def head(title):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><meta name="description" content="Reader bonuses for {BOOK} by {AUTHOR}.">
<meta property="og:title" content="{BOOK}: reader bonuses"><link rel="icon" href="{ICON}">
<link rel="stylesheet" href="css/style.css"></head><body>
<div class="topbar"><div class="in"><a class="brand" href="index.html">{BOOK.split(' Worth')[0]} <i>Worth Signing</i></a><span class="who">Reader bonuses</span></div></div>
'''
FOOT=f'''<footer><span class="who">{AUTHOR}</span>{BOOK} · reader bonuses, for your own practice</footer>'''
ITEMS=[('Video lessons','Watch all 155 letters, joins, capitals, numbers and brush strokes of the book being written, stroke by stroke.'),
       ('Printable pack','Guide sheets, the speed log, the four-week plan and every practice page of the book, ready to print.'),
       ('Occasions kit','Card, envelope, place card and gift tag templates at true size, with 40 ready phrases in both hands.'),
       ('52 Weeks of Lines Worth Writing','A page a week for a year: a famous line to trace and copy, one word in the brush hand, a question to answer.'),
       ('Practice Sheet Maker','Type your name or any words and print a guide sheet in the book\'s own hand, slanted or upright.')]
def index():
    li=''.join(f'<li><span class="num">{i+1}</span><div><b>{t}</b><span>{d}</span></div></li>' for i,(t,d) in enumerate(ITEMS))
    return head(f'{BOOK} · Reader bonuses')+f'''<main>
<section class="hero"><span class="kick">Reader bonuses</span>
<img class="word" src="img/hero.svg" alt="Thank you, written with a brush pen" width="420" height="160">
<h1>Five extras for <em>your practice</em></h1>
<p class="lead">Thank you for choosing the book. Everything below was made to go with it, and it takes two short steps to unlock.</p>
<a class="btn" href="review.html">Get my bonuses {ARROW}</a></section>
<div class="panel"><ul class="list">{li}</ul></div>
</main>{FOOT}</body></html>'''
def review():
    return head('Step 1 · Reader bonuses')+f'''<main><div class="steps"><span class="dot on">1</span><span class="bar"></span><span class="dot">2</span><span class="step-label">&nbsp;Step 1 of 2</span></div>
<h1>A quick <em>favor</em> first</h1>
<p class="lead">An honest review on Amazon helps other readers find a book that gets their handwriting where they want it. Two lines are enough: what helped you, and what you would like to see improved.</p>
<!-- REVIEW LINK: set ASIN in build.py once the paperback is live -->
<a class="btn shine" id="review" href="{REVIEW}" target="_blank" rel="noopener"><span class="star">★</span> Write my review on Amazon {OUT}</a>
<div class="reveal" id="after"><div class="panel" style="margin-top:6px">
<p style="margin-bottom:4px"><b>Done?</b> Come back here once your review is posted.</p>
<a class="btn" href="bonus.html" id="done">I've left my review {ARROW}</a></div></div>
<p class="mute">All we ask is an honest review.</p>
</main>{FOOT}
<script>
(function(){{var K='hws_review_clicked',a=document.getElementById('after');
function show(){{a.className='reveal show'}}
try{{if(localStorage.getItem(K)==='1')show()}}catch(e){{}}
document.getElementById('review').addEventListener('click',function(){{try{{localStorage.setItem(K,'1')}}catch(e){{}}setTimeout(show,1200)}});
document.getElementById('done').addEventListener('click',function(){{try{{localStorage.setItem('hws_unlocked','1')}}catch(e){{}}}});
}})();
</script></body></html>'''
def card(tag,title,text,btn):
    return f'<div class="card"><div class="head"><span class="tag">{tag}</span></div><div class="body"><h2>{title}</h2><p>{text}</p>{btn}</div></div>'
def bonus():
    c=[card('Bonus 1','Video lessons',ITEMS[0][1]+' Watch them on your phone next to the practice page.',
            f'<a class="btn small" href="videos.html">Watch the lessons {ARROW}</a><a class="btn small ghost" href="files/video-lessons.zip" download>Download all videos (ZIP, 4 MB) {DOWN}</a>'),
       card('Bonus 2','Printable pack',ITEMS[1][1]+' 42 pages, US Letter.',f'<a class="btn small" href="files/printable-pack.pdf" download>Download the pack (PDF) {DOWN}</a>'),
       card('Bonus 3','Occasions kit',ITEMS[2][1]+' 26 pages, US Letter.',f'<a class="btn small" href="files/occasions-kit.pdf" download>Download the kit (PDF) {DOWN}</a>'),
       card('Bonus 4','52 Weeks of Lines Worth Writing',ITEMS[3][1]+' 54 pages, US Letter.',f'<a class="btn small" href="files/52-weeks.pdf" download>Download the year (PDF) {DOWN}</a>'),
       card('Bonus 5','Practice Sheet Maker',ITEMS[4][1],f'<a class="btn small" href="sheet-maker.html">Make a sheet {ARROW}</a>')]
    return head('Step 2 · Your bonuses')+f'''<main><div class="steps"><span class="dot done">1</span><span class="bar done"></span><span class="dot on">2</span><span class="step-label">&nbsp;Step 2 of 2</span></div>
<h1>Your <em>bonuses</em></h1>
<p class="mute">Print every PDF at 100% (Actual size) on US Letter paper.</p>
<div class="lockbox" id="lock"><p><b>Almost there.</b> The bonuses unlock after step 1.</p>
<a class="btn small" href="review.html">Go to step 1 {ARROW}</a></div>
<div class="panel nudge" id="nudge"><p style="margin:0 0 4px"><b>Sure you left your review?</b> If you have not posted it yet, it takes two minutes and helps other readers find this book. An honest review is all we ask.</p>
<a class="btn shine small" href="{REVIEW}" target="_blank" rel="noopener"><span class="star">★</span> Write my review now</a></div>
<div class="cards" id="items">{''.join(c)}</div>
</main>{FOOT}
<script>
(function(){{var u=false;try{{u=localStorage.getItem('hws_unlocked')==='1'||localStorage.getItem('hws_review_clicked')==='1'}}catch(e){{}}
document.getElementById('items').className=u?'cards':'cards locked';document.getElementById('lock').style.display=u?'none':'block';document.getElementById('nudge').style.display=u?'block':'none';}})();
</script></body></html>'''
CH=[('ch03','Chapter 3','The everyday alphabet',[('everyday-lowercase','Lowercase letters')]),
    ('ch04','Chapter 4','Joins',[('join1','Join 1: up and in'),('join2','Join 2: up and over'),('join3','Join 3: up to the top'),('join4','Join 4: straight across'),('into-e','Into e'),('word','Whole words')]),
    ('ch05','Chapter 5','Capitals and numbers',[('everyday-capital','Capitals'),('everyday-digit','Numbers')]),
    ('ch09','Chapter 9','Brush pen basic strokes',[('brush-stroke','The eight basic strokes')]),
    ('ch10','Chapter 10','The brush alphabet',[('brush-lowercase','Lowercase letters'),('brush-capital','Capitals'),('brush-connection','Connections'),('brush-word','Whole words')])]
def label(n):
    t=n.split('-',1)[1]
    for p in ['everyday-lowercase-','everyday-capital-','everyday-digit-','brush-lowercase-','brush-capital-','brush-stroke-','brush-connection-','brush-word-','join1-','join2-','join3-','join4-','into-e-','word-']:
        if t.startswith(p): t=t[len(p):]; break
    return t.replace('-',' ')
def videos():
    files=sorted(os.path.basename(f)[:-4] for f in glob.glob('videos/*.mp4'))
    body=''; jump=''
    for ch,cn,title,groups in CH:
        jump+=f'<a href="#{ch}">{cn[8:]}: {title}</a>'
        body+=f'<section class="chap" id="{ch}"><h2><small>{cn}</small>{title}</h2>'
        for key,gname in groups:
            fs=[f for f in files if f.startswith(ch+'-'+key+'-')]
            if not fs: continue
            body+=f'<div class="grp">{gname}</div><div class="vgrid">'
            for f in fs:
                body+=f'<div class="vtile"><button class="vplay" aria-label="Play {label(f)}"><video src="videos/{f}.mp4" poster="posters/{f}.jpg" preload="none" muted playsinline></video><i></i></button><span>{label(f)}</span></div>'
            body+='</div>'
        body+='</section>'
    return head('Video lessons · Reader bonuses')+f'''<main><span class="kick">Bonus 1</span><h1>Video <em>lessons</em></h1>
<p class="lead">Tap any letter to watch it being written. The red dot is the pen; it lifts where the pen lifts. Watch once, then write it on the practice page.</p>
<div class="jump">{jump}</div>{body}
<p class="mute" style="margin-top:28px"><a href="bonus.html">Back to all bonuses</a></p></main>{FOOT}
<script>
document.querySelectorAll('.vplay').forEach(function(b){{var v=b.querySelector('video');
b.addEventListener('click',function(){{document.querySelectorAll('.vplay.on').forEach(function(o){{if(o!==b){{o.classList.remove('on');o.querySelector('video').pause();}}}});
if(v.paused){{if(v.ended)v.currentTime=0;v.play();b.classList.add('on');}}else{{v.pause();b.classList.remove('on');}}}});
v.addEventListener('ended',function(){{b.classList.remove('on');}});}});
</script></body></html>'''
if __name__=='__main__':
    for name,fn in [('index',index),('review',review),('bonus',bonus),('videos',videos)]:
        open(name+'.html','w').write(fn())
    print(sum(1 for _ in glob.glob('videos/*.mp4')),'videos')
