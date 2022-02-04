import { full } from "./db/arabic.js";
import { name } from "./db/name.js";
const navigaateTo = (url)=>{
    history.pushState(null,null, url);
    router();
}
const router = async () => {
  
    const routes =[
        {path:'/',view: ()=>console.log('home')},
        {path:'/error',view: ()=>console.log('error')}

    ];
    for(let names of name){
        routes.push({path:`/${names.englishName}`,view: ()=>console.log(`${names.englishName}`)})
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
document.addEventListener("DOMContentLoaded",()=>{
    router();
});