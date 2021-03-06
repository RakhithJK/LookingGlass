/* Concatenated efmarker.*.js files */

/*******************************************************************************

 EFatMarker, highlight specific portion(s) of a document
 Copyright 2012 Raymond Hill, all rights reserved
 license: MIT


 TODO: cleanup, remove hard-coded stuff, lint, convenient & pretty api, etc.

*******************************************************************************/
(function($) {

window.EFatMarker=function(b){var d=$(b);if(!d){return}this.parentNode=d;var e=[],f=0,g=d.childNodes.length,h,k=0,j=[],c,i,a;for(;;){while(f<g){c=d.childNodes[f++];
if(c.nodeType===3){e.push({i:k,n:c});h=c.nodeValue;k+=h.length}else{if(c.nodeType===1){i=c.childNodes.length;if(i){j.push({n:d,l:g,i:f});d=c;g=i;f=0}}}}if(!j.length){break
}a=j.pop();d=a.n;g=a.l;f=a.i}e.push({i:k});this.textmap=e;this.textLength=k;this.spans=[];this.base64Digits="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
this.tokenToSpans=function(){var p=new URI(window.location.href),q=p.get("fragment")||"",t;t=q.match(/^efm(([-\w]{6}){1,})/);if(!t||!t.length){return}q=t[1];this.spans=[];
var l=this.base64Digits,m,r,u;for(var s=0,o=q.length;s<o;s+=6){u=q.substr(s,6);m=(l.indexOf(u.charAt(0))<<12)+(l.indexOf(u.charAt(1))<<6)+l.indexOf(u.charAt(2));
r=(l.indexOf(u.charAt(3))<<12)+(l.indexOf(u.charAt(4))<<6)+l.indexOf(u.charAt(5));this.addSpan(m,r)}};this.spansToToken=function(){var s=this.spans.length;if(!s){return""
}var q=this.base64Digits,o=["efm"],p,r,l;for(var m=0;m<s;m++){p=this.spans[m];r=p.start;l=p.end;o.push(String(q[r>>12&63])+String(q[r>>6&63])+String(q[r&63]));o.push(String(q[l>>12&63])+String(q[l>>6&63])+String(q[l&63]))
}return o.join("")};this.addSpan=function(l,o){if(l>o){var p=l;l=o;o=p}l=Math.max(0,l);o=Math.min(this.textLength,o);if(l==o){return}var s=this.spans,m=s.length,q,t,r=0,u=m;
while(r<u){q=r+u>>1;if(o<s[q].start){u=q}else{if(l>s[q].end){r=q+1}else{u=q}}}while(u<m){t=s[u];if(t.start>o){break}l=Math.min(t.start,l);o=Math.max(t.end,o);u++
}s.splice(r,u-r,{start:l,end:o})};this.removeSpans=function(l,o){if(l>o){var p=l;l=o;o=p}l=Math.max(0,l);o=Math.min(this.textLength,o);if(l==o){return}var s=this.spans,m=s.length,q,t,r=0,u=m;
while(r<u){q=r+u>>1;if(o<=s[q].start){u=q}else{if(l>=s[q].end){r=q+1}else{u=q}}}var v;while(u<m){t=s[u];if(t.start>o){break}v=Math.max(t.start,l);toremove_end=Math.min(t.end,o);
if(v>t.start&&toremove_end<t.end){s.splice(u+1,0,{start:toremove_end,end:t.end});t.end=v;u+=2;m++}else{if(v==t.start&&toremove_end<t.end){t.start=toremove_end;u++
}else{if(v>t.start&&toremove_end==t.end){t.end=v;u++}else{s.splice(u,1);m--}}}}};this.unhighlightAll=function(m){this.spans=[];if(m){if(window.getSelection){var l=window.getSelection();
if(l){window.getSelection().removeAllRanges()}}this.syncDOM()}};this.spanInSpan=function(p,l){var n=this.spans,m=n.length,o;while(m-->0){o=n[m];if(p>=o.start&&l<=o.end){return true
}}return false};this.hasSpans=function(){return this.spans.length>0};this.highlightSelection=function(p){if(!window.getSelection){return}var o=window.getSelection();
if(!o){return}for(var n=0;n<o.rangeCount;n++){var m=o.getRangeAt(n);var l=this.normalizeOffset(m.startContainer,m.startOffset);var q=this.normalizeOffset(m.endContainer,m.endOffset);
if(l<0||q<=l){continue}this.addSpan(l,q)}if(p){o.removeAllRanges();this.syncDOM()}};this.unhighlightSelection=function(p){if(!window.getSelection){return}var o=window.getSelection();
if(!o){return}for(var n=0;n<o.rangeCount;n++){var m=o.getRangeAt(n);var l=this.normalizeOffset(m.startContainer,m.startOffset);var q=this.normalizeOffset(m.endContainer,m.endOffset);
if(l<0||q<=l){continue}this.removeSpans(l,q)}if(p){o.removeAllRanges();this.syncDOM()}};this.interpretSelection=function(p){if(!window.getSelection){return}var o=window.getSelection();
if(!o){return}for(var n=0;n<o.rangeCount;n++){var m=o.getRangeAt(n);var l=this.normalizeOffset(m.startContainer,m.startOffset);var q=this.normalizeOffset(m.endContainer,m.endOffset);
if(l<0||q<=l){continue}if(this.spanInSpan(l,q)){this.removeSpans(l,q)}else{this.addSpan(l,q)}}if(p){o.removeAllRanges();this.syncDOM()}};this.syncDOM=function(){this.unrender();
this.render();var o=this.spansToToken(),r=new URI(window.location.href);r.set("fragment",o);var m=r.toString().cleanQueryString();var q=$("efm-permalink");if(q){q.href=m;
q.innerHTML=o?"Permalink with highlights:<br><i>[...]</i>#"+o.replace(/^efm(.{3,10}).+?(.{3,10})$/,"$1...$2"):"Permalink: [no highlights]"}var q=$("efm-twitter-button");
if(q){var n=[];n.push("url="+String(encodeURIComponent(m)));var l=[document.querySelector("head title").innerHTML.replace(/_.*$/,""),"#wlfind"];n.push("text="+encodeURIComponent(l.join(" ")));
n.push("related=wikileaks");var p=document.querySelector('head link[rel="canonical"]');if(p){n.push("counturl="+String(encodeURIComponent(p.href)))}q.href="https://twitter.com/share?"+n.join("&")
}$$(".efm-need-highlight").each(function(s){s.style.display=o?"":"none"})};this.unrender=function(){var m=this.textmap,l=m.length-1,o,p,n;while(l-->0){o=m[l];p=o.n.parentNode;
if(p&&p.className&&p.className==="efm-hi"){p.parentNode.replaceChild(o.n,p)}}l=m.length-1;while(l-->0){o=m[l];n=o.n.parentNode;if(p&&p.className&&n.className==="efm-parent"){while(n.hasChildNodes()){n.parentNode.insertBefore(n.firstChild,n)
}n.parentNode.removeChild(n)}}};this.render=function(){var m=this.spans,l=m.length,n;while(l-->0){n=m[l];this.renderSpan(n.start,n.end)}};this.renderSpan=function(A,p){var n=this.textmap,q,s,z,x,y,l,t,r,v,o,w,m,u;
s=0;z=n.length;while(s<z){q=s+z>>1;if(A<n[q].i){z=q}else{if(A>=n[q+1].i){s=q+1}else{s=z=q}}}x=s;z=n.length;while(x<z){y=n[x];l=y.i;t=y.n.nodeValue;v=A-l;o=Math.min(p,n[x+1].i)-l;
n.splice(x,1);w=document.createElement("span");w.className="efm-parent";if(v>0){u=document.createTextNode(t.substring(0,v));w.appendChild(u);n.splice(x,0,{i:l,n:u});
l+=u.length;x++}m=document.createElement("span");u=document.createTextNode(t.substring(v,o));m.appendChild(u);m.className="efm-hi";w.appendChild(m);n.splice(x,0,{i:l,n:u});
l+=u.length;x++;if(o<t.length){u=document.createTextNode(t.substr(o));w.appendChild(u);n.splice(x,0,{i:l,n:u});l+=u.length;x++}y.n.parentNode.replaceChild(w,y.n);
if(p<=n[x].i){break}}};this.getTextNodes=function(){};this.normalizeOffset=function(q,p){if(q.nodeType!==3){return -1}var l=q.parentNode;if(l!=this.parentNode&&!l.getParent("#"+String(this.parentNode.id))){return -1
}var m=this.textmap,o=m.length,n;while(o-->0){n=m[o];if(q===n.n){return n.i+p}}return -1}};

})(document.id);


/* Added efatmarker.inc.js file */

(function() {
    var $ = document.id;
    window.addEvent('domready', function(){
    var markerButton = $('efm-button');
    if (markerButton) {
        eMarker = new EFatMarker($('uniquer'));
        eMarker.tokenToSpans();
        markerButton.addEvent('mousedown', function(){
            eMarker.interpretSelection(true);
            return false;
        });

        $('efm-unhighlightall').addEvent('mousedown', function(){
            eMarker.unhighlightAll(true);
            return false;
        });
        $('efm-unhighlight').addEvent('mousedown', function(){
            eMarker.unhighlightSelection(true);
            return false;
        });
        $('efm-highlight').addEvent('mousedown', function(){
            eMarker.highlightSelection(true);
            return false;
        });
        $('efm-permalink').addEvent('mousedown', function(){
            window.location.href = this.href;
            return false;
        });
        if (Keyboard) {
            var keyboard = new Keyboard({
                defaultEventType: 'keyup',
                events: {
                    'h': function(){
                        eMarker.highlightSelection(true);
                    },
                    'u': function(){
                        eMarker.unhighlightSelection(true);
                    }
                }
            });
            keyboard.activate();
        }
        eMarker.syncDOM();
        if (eMarker.hasSpans()) {
            var scroll = new Fx.Scroll(
                window, {
                    offset: {
                        'x': 0,'y': -100
                    }
                }
            ),
            highlights = $$('#uniquer .efm-hi');
            if (highlights.length > 0) {
                scroll.toElement(highlights[0]);
            }
        }
    }
    });
})();
