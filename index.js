;function QuranCloud(){
this.version='1.1.0';
this.host='http://api.alquran.cloud/v1/';
this.index=null;
window._this=this;
window._QuranCloud=this;
/* ini toggle */
this.toggle=function(id){
  var el=document.getElementById(id);
  if(!el){return false;}
  var dis=el.style.display;
  el.style.display=dis=='none'?'block':'none';
};
/* parse ayat detail */
this.ayatDetail=function(ayat,indo,tafsir){
  index.innerHTML='';
  var head=document.createElement('div');
  var arabic=document.createElement('div');
  var english=document.createElement('div');
  var detail=document.createElement('div');
  head.classList.add('row-head');
  arabic.classList.add('arabic-head');
  english.classList.add('english');
  detail.classList.add('detail');
  arabic.innerText=ayat.surah.name;
  english.innerText=ayat.surah.englishName
    +' ('+ayat.surah.englishNameTranslation+')';
  detail.innerText='Ayat '+ayat.numberInSurah+'';
  head.appendChild(arabic);
  head.appendChild(english);
  head.appendChild(detail);
  index.appendChild(head);
  
    var row=document.createElement('div');
    var arabic=document.createElement('div');
    var english=document.createElement('div');
    var detail=document.createElement('div');
    row.classList.add('row-data');
    arabic.classList.add('arabic');
    english.classList.add('english');
    detail.classList.add('detail');
    arabic.innerText=this.arabicNumber(ayat.numberInSurah)
      +'. '+ayat.text;
    arabic.title=ayat.text;
    english.innerText=ayat.numberInSurah+'. '+indo.text;
    row.appendChild(arabic);
    row.appendChild(english);
    row.appendChild(detail);
    index.appendChild(row);
  
    var row=document.createElement('div');
    var arabic=document.createElement('div');
    var english=document.createElement('div');
    var detail=document.createElement('div');
    row.classList.add('row-data');
    arabic.classList.add('arabic');
    english.classList.add('english');
    detail.classList.add('arabic');
    arabic.innerText=tafsir.edition.name;
    english.innerText=tafsir.edition.englishName;
    detail.innerText=tafsir.text;
    row.appendChild(arabic);
    row.appendChild(english);
    row.appendChild(detail);
    index.appendChild(row);
  
};
/* parse ayat list */
this.ayatList=function(r,indo){
  index.innerHTML='';
  var head=document.createElement('div');
  var arabic=document.createElement('div');
  var english=document.createElement('div');
  var detail=document.createElement('div');
  head.classList.add('row-head');
  arabic.classList.add('arabic-head');
  english.classList.add('english');
  detail.classList.add('detail');
  arabic.innerText=r.name;
  english.innerText=r.englishName
    +' ('+r.englishNameTranslation+')';
  detail.innerText=r.revelationType
    +', '+r.numberOfAyahs+' ayats';
  head.appendChild(arabic);
  head.appendChild(english);
  head.appendChild(detail);
  index.appendChild(head);
  for(var i in r.ayahs){
    var ayat=r.ayahs[i];
    var row=document.createElement('div');
    var arabic=document.createElement('div');
    var english=document.createElement('div');
    var detail=document.createElement('div');
    row.classList.add('row-data');
    row.dataset.number=r.number;
    row.dataset.ayat=ayat.numberInSurah;
    arabic.classList.add('arabic');
    english.classList.add('english');
    detail.classList.add('detail');
    arabic.innerText=this.arabicNumber(ayat.numberInSurah)
      +'. '+ayat.text;
    arabic.title=ayat.text;
    english.innerText=ayat.numberInSurah+'. '+indo.ayahs[i].text;
    row.appendChild(arabic);
    row.appendChild(english);
    row.appendChild(detail);
    index.appendChild(row);
    row.onclick=function(){
      return _this.go('#surah='+this.dataset.number
        +'&ayat='+this.dataset.ayat);
    };
  }return index;
};
/* parse surah list */
this.surahList=function(){
  var data=window.SURAH_LIST;
  index.innerHTML='';
  var head=document.createElement('div');
  head.classList.add('row-head');
  head.innerText='List of Surah ('+data.length+')';
  index.appendChild(head);
  var idx=0;
  for(var i in data){
    idx++;
    var surah=data[i];
    var row=document.createElement('div');
    var arabic=document.createElement('div');
    var english=document.createElement('div');
    var detail=document.createElement('div');
    row.classList.add('row-data');
    row.dataset.number=idx;
    arabic.classList.add('arabic');
    english.classList.add('english');
    detail.classList.add('detail');
    arabic.innerText=surah.name;
    arabic.title=surah.name;
    english.innerText=idx+'. '+surah.englishName
      +' ('+surah.englishNameTranslation+')';
    detail.innerText=surah.revelationType
      +', '+surah.numberOfAyahs+' ayats';
    row.appendChild(english);
    row.appendChild(arabic);
    row.appendChild(detail);
    index.appendChild(row);
    row.onclick=function(){
      return _this.go('#surah='+this.dataset.number);
    };
  }return index;
};
/* load surah */
this.loadSurah=function(surah,ayat){
  this.loading();
  window.SURAH_LIST=window.SURAH_LIST||[];
  if(!surah){
    if(window.SURAH_LIST.length==0){
      return this.get('surah',function(r){
        if(!r.data||!Array.isArray(r.data)){
          return _this.error('Failed to get content.');
        }window.SURAH_LIST=r.data;
        return _this.surahList();
      },function(e){
        return _this.error('Failed to get content.');
      });
    }return this.surahList();
  }
  if(!ayat){
    var url='surah/'+surah+'/editions/quran-uthmani,id.indonesian';
    return this.get(url,function(r){
      if(!r.data||!Array.isArray(r.data)){
        return _this.error('Failed to get content.');
      }return _this.ayatList(r.data[0],r.data[1]);
    },function(e){
      return _this.error('Failed to get content.');
    });
  }
  var url='ayah/'+surah+':'+ayat
    +'/editions/quran-uthmani,id.indonesian,ar.jalalayn';
  return this.get(url,function(r){
    if(!r.data||!Array.isArray(r.data)){
      return _this.error('Failed to get content.');
    }return _this.ayatDetail(r.data[0],r.data[1],r.data[2]);
  },function(e){
    return _this.error('Failed to get content.');
  });
};
/* print error */
this.error=function(s){
  s=typeof s==='string'?s:'';
  var d=document.createElement('div');
  d.classList.add('error');
  d.innerText='Error: '+s;
  index.innerHTML='';
  index.appendChild(d);
  return d;
};
/* print loading */
this.loading=function(s){
  var d=document.createElement('div');
  d.classList.add('loading');
  index.innerHTML='';
  index.appendChild(d);
  return d;
};
/* initialize */
this.init=function(){
  var index=document.getElementById('index');
  if(!index){return false;}
  this.index=index;
  window.SURAH_LIST=window.SURAH_LIST||[];
  window.onpopstate=function(){
    return _this.init();
  };
  var query=this.query();
  if(query.surah){
    if(query.ayat){
      return this.loadSurah(query.surah,query.ayat);
    }return this.loadSurah(query.surah);
  }return this.loadSurah();
};
/* arabic number */
this.arabicNumber=function(number){
  var arabic=['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  var result='';
  number=number.toString();
  for(var i in number){
    result+=''+arabic[number[i]];
  }return result;
};
/* assign url */
this.go=function(url){
  window.location.assign(url);
};
/* get url query as object */
this.query=function(){
  var query=window.location.hash.substr(1);
  var raws=query.split('&');
  var result={};
  for(var i in raws){
    var raw=raws[i].split('=');
    result[raw[0]]=raw[1];
  }return result;
};
/* get quran content
 * url = string of url
 * cb  = function of success callback
 * er  = function of error callback
 * txt = bool of text output
 */
this.get=function(url,cb,er,txt){
  cb=typeof cb==='function'?cb:function(){};
  er=typeof er==='function'?er:function(){};
  txt=txt===true?true:false;
  var xhr=new XMLHttpRequest();
  xhr.open('GET',this.host+url,true);
  xhr.send();
  xhr.onreadystatechange=function(e){
    if(xhr.readyState==4){
      if(xhr.status==200){
        var text=xhr.responseText?xhr.responseText:' ';
        if(txt){return cb(text);}
        var res=false;
        try{res=JSON.parse(text);}catch(e){}
        return cb(res?res:text);
      }else if(xhr.status==0){
        return er('Error: No internet connection.');
      }return er('Error: '+xhr.status+' - '+xhr.statusText+'.');
    }else if(xhr.readyState<4){
      return false;
    }return er('Error: '+xhr.status+' - '+xhr.statusText+'.');
  };return true;
};
/* temporary */
this.temp=function(){
  return false;
};
/* initializing */
return this.init();
};new QuranCloud;


