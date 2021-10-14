import $ from 'jquery'
const langList = ['zh_CN','en_US','ko_KR','ja_JP','zh_TW','Default'];
var urlParams = new URLSearchParams(window.location.search);
var server = urlParams.get('s');
var l = window.localStorage.getItem('lang');
var doctor = window.localStorage.getItem('doctor');
var hidetip = window.localStorage.getItem('hidetip');
var showDelay = window.localStorage.getItem('showDelay');
var hideName = window.localStorage.getItem('hideName');
var storyFile = urlParams.get('f');
var storyData = {eventName: "Loading..."};

if(!server){server = 'zh_CN'};
if(!l || l == 'none' || l == 'Default'){l = navigator.language.replace('-','_')};
if(l=='ja'){l = 'ja_JP'};
if(langList.indexOf(l) == -1){l = 'en_US'};
console.log('Current Language: '+l);
if(!doctor){doctor = "{@nickname}"};
if(!hidetip){hidetip = false};
if(!showDelay){showDelay = 'y'};
if(!hideName){hideName = 'n'};



export default {
    urlParams: urlParams,
    l: l,
    langList:langList,
    server: server,
    doctor: doctor,
    hidetip: hidetip,
    showDelay: showDelay,
    hideName: hideName,
    storyFile: storyFile,
    storyData: storyData,
    parseContent(content){
        if(content){
            const color_re = /<color=([\w#]+)>(.+?)<\/color>/gm;
            const color_sub = `<span style="color:$1">$2</span>`;
            content = content.replaceAll('{@nickname}',this.doctor);
            content = content.replaceAll('\\n','<br/>')
            content = content.replace(color_re,color_sub);
        }
        return content;
    },
    focus(){
        var foc = document.getElementsByClassName('storyFocused')[0];
        if(foc){
            foc.scrollIntoView({behavior: "smooth", block: "center"});
        }
        console.log('focused!')
    }
}