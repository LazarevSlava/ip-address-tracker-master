export function addOffset(map){
    console.log('offset');
   const offsetY=map.getSize().y*0.12; 
 map.panBy([0,-offsetY],{animate:false});
}