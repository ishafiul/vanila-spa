import { full } from "./db/arabic.js";
import { en } from "./db/english.js";
import { name } from "./db/name.js";
const navigaateTo = (url)=>{
    history.pushState(null,null, url);
    router();
}
const router = async () => {
  
    const routes =[
        {path:'/',view: ()=>{
            document.getElementById('info').innerHTML=`
            <div class="flex justify-center text-center">
                <h1 class="text-6xl font-extrabold">Al-Quran SPA</h1>
                
                </div>
                <div class="text-center mt-16">
                <p class="text-xl">Al-Quran SPA is simple and basic Quran with English translation</p>
                </div>
            `;
            document.getElementById('content').innerHTML='';
        }},
        {path:'/error',view: ()=>{
            document.getElementById('info').innerHTML=`
            <div class="flex justify-center text-center">
                <h1 class="text-6xl font-extrabold">OOOPS! Page not Found.</h1>
                </div>
            `;
        }}

    ];
    for(let names of name){
        routes.push({path:`/${names.englishName}`,view: ()=>{
            let arabic =''
            let i=0;
            for(let ayah of full.data.surahs[names.number-1].ayahs){
                arabic +=`
                <div class="flex items-center gap-4" dir="rtl">
                <div class="bg-slate-500 h-14 w-14 rounded-full flex justify-center items-center text-2xl text-white">${ayah.number}</div>
                <div class="space-y-4">
                <p>${ayah.text}</p>
                <p class="text-2xl text-center" dir="ltr">${en.data.surahs[names.number-1].ayahs[i].text}</p>
                </div>
                </div>
                `;
                i++;
            }
            document.getElementById('info').innerHTML=`
                <div class="flex justify-center text-center">
                <div class="space-y-2">
                <h1 class="text-6xl font-extrabold">${names.name}</h1>
                <h2 class="text-4xl font-extrabold">${names.englishName}</h2>
                <h3 class="text-2xl font-bold">${names.englishNameTranslation}</h3>
                <h4 class="text-xl">(${names.revelationType})</h4>
                </div>
                </div>
            `;
            document.getElementById('content').innerHTML=arabic;
            //console.log();
            document.title=names.englishName;
        }
    });
    }
    const matchRoutes = routes.map(route=>{
        return {
            route: route,
            isMatach: location.pathname === route.path
        }
    });
    
    let match = matchRoutes.find(matchRoute =>matchRoute.isMatach)

    if(!match){
        match ={
            route: routes[1],
            isMatach: true
        }
    }
    match.route.view()
};
window.addEventListener("popstate",router);
document.addEventListener("DOMContentLoaded",()=>{
    document.body.addEventListener("click", e=>{
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigaateTo(e.target.href)
        }
    })
    
    router();
    
});
 let navs ='';

for(let nav of name){
    navs +=`
    <a href="/${nav.englishName}" data-link class="text-xl border-2 rounded-md p-4 hover:shadow-lg focus:border-green-200 focus:bg-green-100 flex items-center gap-4 font-semibold">
    <div class="bg-slate-500 rounded-full h-12 w-12 p-2 flex items-center justify-center text-white font-normal">${nav.number}</div> ${nav.englishName}
    </a>
    `;
}
document.getElementById('nav').innerHTML=navs;





