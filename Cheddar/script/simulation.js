// Création des classes Task et timeUnitEvent

class Task{
    constructor(id, taskName, taskType, period, capacity, deadline, processor){
        this.id = id
        this.taskName = taskName
        this.taskType = taskType
        this.processor = processor
        this.period = period
        this.capacity = capacity
        this.deadline = deadline
    }
    
    afficheTable(i){
        let val = Task.palette[i];

        table += "<tr><td>" +  this.taskName + "</td><td>" + 
        this.taskType + "</td><td>" + this.period + "</td><td>" + this.capacity + 
        "</td><td>" + this.deadline + "</td><td>" + this.processor + "</td><td>" +
        "<input type='color' id='color"+i+"' name='color' value='"+val+"'> </td></tr>"; 

        document.getElementById("data").innerHTML = table;
 
    }

    static clearTable(){
        const tableBody = document.getElementById("data");

        // Supprimer toutes les lignes
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    }
 
    // Palette de couleurs comme propriété statique dans la classe
    static palette = [
        "#4BA8B2", // bleu
        "#fc8c3d", // orange
        "#d47b9f", // rose
        "#A8C686", // vert
        "#F9DB6D", // jaune
        "#A06CD5", // violet
        "#F49D6E", // saumon
        "#76B041", // vert foncé
        "#FF6F61", // rouge
        "#0081A7", // bleu foncé
        "#FBB13C"  // doré
    ];

    static changeColor(nbr){
        for (let i=0; i<nbr; i++){
            let input = document.querySelector("#color" + i);
            // La méthode querySelector() de l'interface Document retourne 
            // le premier Element dans le document correspondant au sélecteur

            input.addEventListener("input", () => Task.updateColor(input, i));
            // expression de fonction fléchée, pas destinée à être réutilisé
        }
    }

    static updateColor(input, i){
        if (input) {
            let userColor = input.value;
            console.log('New color: ' + userColor + ' for #color' + i);
            Task.palette[i]=userColor; 
            drawEvent();
        }  
    }

    static period_color = "black";
    // stocker period_color comme propriété statique dans la classe
    
    static drawPeriod(limite_line, j){
        // délimitation de la période d'activation 

        let y = period_y+j*saut-pos_y,  x = baseX; 
       
        while(x <= limite_line){
            ctx.moveTo(x,y);
            ctx.fillStyle = Task.period_color;
            ctx.fillRect(x-x_2, y, baseRec, cote+h_8+pos_y);
            x = x + (periods[j]*cote); 
        }
        
    }
    
    static changePeriodColor(){
        let newColor = document.getElementById("period_delimitation");
        
        newColor.addEventListener("input", () => Task.updatePeriodColor(newColor));
        console.log("old "+ this.period_color, "period : "+newColor);
    }

    static updatePeriodColor(newColor){
        Task.period_color = newColor.value;
        drawEvent();
    }

}


class timeUnitEvent{
    constructor(timeUnit, coreName, taskID, eventType){
        this.taskID = taskID
        this.coreName = coreName
        this.eventType = eventType
        this.timeUnit = timeUnit
    }

    static drawTimeLine(len, cote, tiret, unit, c_width, espace){
        /* augmenter dynamiquement la hauteur du <canvas> selon le nombre de lignes
        à dessiner */
        canvas.height = (len+2) * saut;
        canvas.width = c_width;

        // vérifier que canvas est vide avant dessin
        ctx.clearRect(0, 0, canvas.width, canvas.height); 

        let x = baseX; 
        let y = baseY; 
        let esp = upto/unit_5; 
        limite_line = upto*cote+x; 
        
        while(limite_line > canvas.width){
            canvas.width += wid; 
        }

        const comp_nbr = esp*unit_5+unit_5;
        let nbr;
        
        if(espace < comp_nbr){
            nbr = comp_nbr-(upto+1); 
        }

        ctx.beginPath();
        for(let i= 0; i<len; i++){
            ctx.moveTo(x, y-unit);
            ctx.lineTo(x, y+unit);
            ctx.moveTo(x, y);
            ctx.lineTo(limite_line, y); 
            for(let j= 0; j<esp; j++){
                for(let i = 0; i<4; i++){
                    if(x < limite_line){
                        ctx.moveTo(x+cote, y-unit);
                        ctx.lineTo(x+cote, y+unit);
                        x = x + cote;
                    }
                }  
                if(x < limite_line){
                    x = x + cote;  
                    ctx.moveTo(x, y-unit);
                    ctx.lineTo(x, y+unit);
                }
            }
            x = baseX; 
            y = y + saut;  
        }

        
        // Ajouter des axes de répère avec boucle
        x = baseX; 
        y = baseY; 
        ctx.font = "14px Arial bold";
        
        const labels = [];
        let l = 0; 
        for(let i=0; i<=esp; i++){
            labels[i] = l+".00"; 
            l+= unit_5;
        }

        for (let i = 0; i < labels.length; i++) {
            ctx.fillText(labels[i], x - x_10, y + decalage);
            x = x + (unit_5 * cote);
        }

        
        // Timeline indication
        x = baseX; 
        y = baseY;
        let n = esp+1; 

        for(let j= 0; j<n; j++){
            if(x <= limite_line){
                ctx.moveTo(x, y);
                ctx.fillStyle="black"; 
                ctx.fillRect(x-x_2,y-tiret,baseRec, cote+pos_y);
                x = x + (unit_5 * cote);
            }
        }

        ctx.stroke();

    }
    
    drawTaskZone(y, nbr, cote, tiret, upto){
        const haut = tiret;
        let limiteX = baseX + upto * cote;
        
        let x = baseX + Number(this.timeUnit) * cote;
        
        let index = tacheID.indexOf(this.taskID);
        let color = Task.palette[index%tacheID.length];
        y += index * saut;
        console.log(index, this.taskID, color); 

        // éviter de dessiner hors limite
        if(x<limiteX){ 
            ctx.fillStyle = color;
            ctx.fillRect(x, y - haut, cote, 2 * haut);
        }

        // dernière ligne
        nbr = baseX + decalage + nbr * saut;
        if(x<limiteX){ 
            ctx.fillStyle = color;
            ctx.fillRect(x, nbr - haut, cote, 2 * haut);
        }
    }

    drawAccessRes(y, cote, tiret, upto, from_unit, long){
        const haut = tiret;
        let limiteX = baseX + upto * cote;
        let limiteMax = baseX + upto * cote;

        let x = baseX + Number(from_unit) * cote;

        
        let index = tacheID.indexOf(this.taskID);
        let color = Task.palette[index%tacheID.length];
        
          
        // éviter de dessiner hors limite
        let x_f = x + long + cote;
        let base_selon_x_f = cote+long;
        let new_x_f; 
        
        if(x_f > limiteMax){
            new_x_f = (upto - from_unit)*cote; 
            base_selon_x_f = new_x_f;
            console.log("To respect limit add: "); 
        }

        if(x<limiteX){ 
            ctx.fillStyle = color;
            ctx.fillRect(x, y - haut, base_selon_x_f, 2 * haut);
        }

        if(x<limiteX){
            // Début accès
            ctx.fillStyle = Resource.resource_color[0]; 
            ctx.fillRect(x, y-tiret-h_4, baseRec, cote+h_8+pos_y);

            // Fin accès
            if(x_f <= limiteX){
               ctx.fillStyle = Resource.resource_color[1]; 
                ctx.fillRect(x_f-x_3, y-tiret-h_4, baseRec, cote+h_8+pos_y);
                console.log("x: "+x, "x_f: "+x_f)
            }   
        }
       
    }

    static getTaskNbr(nbr){
        return nbr;
    }  


}

class Resource{
 constructor(taskNameRes, task_begin, task_end){
        this.taskNameRes = taskNameRes
        this.task_begin = task_begin
        this.task_end = task_end
    }
    
    static drawTimeLine(len, cote, tiret, unit, espace, y_d){
        let x = baseX; 
        let y = y_d+saut; 
        let esp = upto/unit_5; 
        limite_line = upto*cote+x; 

        const comp_nbr = esp*unit_5+unit_5;
        let nbr;
        
        if(espace < comp_nbr){
            nbr = comp_nbr-(upto+1); 
        }

        ctx.beginPath();
        for(let i= 0; i<len; i++){
            ctx.moveTo(x, y-unit);
            ctx.lineTo(x, y+unit);
            ctx.moveTo(x, y);
            ctx.lineTo(limite_line, y); 
            for(let j= 0; j<esp; j++){
                for(let i = 0; i<4; i++){
                    if(x < limite_line){
                        ctx.moveTo(x+cote, y-unit);
                        ctx.lineTo(x+cote, y+unit);
                        x = x + cote;
                    }
                }  
                if(x < limite_line){
                    x = x + cote;  
                    ctx.moveTo(x, y-unit);
                    ctx.lineTo(x, y+unit);
                }
            }
            x = baseX; 
            y = y + saut;  
        }

        
        // Ajouter des axes de répère avec boucle
        x = baseX; 
        y = y_d+saut; 
        ctx.font = "14px Arial bold";
        
        const labels = [];
        let l = 0; 
        for(let i=0; i<=esp; i++){
            labels[i] = l+".00"; 
            l+= unit_5;
        }

        for (let i = 0; i < labels.length; i++) {
            ctx.fillText(labels[i], x - x_10, y + decalage);
            x = x + (unit_5 * cote);
        }
        
        // Timeline indication
        x = baseX; 
        y = y_d+saut;
        let n = esp+1; 

        for(let j= 0; j<n; j++){
            if(x <= limite_line){
                ctx.moveTo(x, y);
                ctx.fillStyle="black"; 
                ctx.fillRect(x-x_2,y-tiret,baseRec, cote+pos_y);
                x = x + (unit_5 * cote);
            }
        }
    
        ctx.stroke();
    }

    static resource_color = [
        "black", // begin of resource
        "red" // end of resource
    ]; 

    static changeResColor(){
        let begin = document.getElementById("begin_resource");
        let end = document.getElementById("end_resource");
        
        begin.addEventListener("input", () => Resource.updateResColor(begin, end));
        end.addEventListener("input", () => Resource.updateResColor(begin, end));
    }

    static updateResColor(begin, end){
        Resource.resource_color[0]= begin.value;
        Resource.resource_color[1]= end.value;
        drawEvent();
    }

}


let xmlhttp1 = new XMLHttpRequest();
let xmlhttp = new XMLHttpRequest();

function loadXMLDoc() {
    let URLmodel = document.getElementById("system_model").value;
    let URLeventTable = document.getElementById("event_table").value;
    console.log(URLmodel, URLeventTable);

    xmlhttp1.onreadystatechange = function(){
        if(xmlhttp1.readyState == 4 && xmlhttp1.status == 200){
            fetchData(); 
        }
    }   
    xmlhttp1.open("GET",URLmodel, true); // chemin d'accès au fichier XML
    xmlhttp1.send(); 

    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            drawEvent();
        }
    }   
    xmlhttp.open("GET",URLeventTable, true); // chemin d'accès au fichier XML
    xmlhttp.send();
}

function fetchData() {
    table = "<tr><th class='tasks'>Task</th> <th class='tasks'>Type</th>"+
    "<th class='tasks'>Period</th> <th class='tasks'>Capacity</th> <th class='tasks'>Deadline</th>"+
    "<th class='tasks'>Processor</th> <th class='tasks'>Color</th></tr>";
    
    let i; 
    let xmlDoc1 = xmlhttp1.responseXML; 
    console.log(xmlhttp1.responseXML); // vérifier si réponse non null
    let tasks = xmlDoc1.getElementsByTagName("periodic_task");
    let y = baseX + decalage;

    // Initilaisation des taches
    const tache =[tasks.length];
    tacheNom = [tasks.length]; 
    for(i=0; i<tasks.length; i++){
        let id = tasks[i].getAttribute("id");
        let task_name = tasks[i].getElementsByTagName("name")[0].textContent; 
        let task_type = tasks[i].getElementsByTagName("task_type")[0].textContent;
        let period = tasks[i].getElementsByTagName("period")[0].textContent;
        let capacity = tasks[i].getElementsByTagName("capacity")[0].textContent;
        let deadline = tasks[i].getElementsByTagName("deadline")[0].textContent;canvas.width 
        let cpu_name = tasks[i].getElementsByTagName("cpu_name")[0].textContent;

        tache[i] = new Task(id, task_name, task_type, period, capacity, deadline, cpu_name); 
        tache[i].afficheTable(i);

        // récupère période
        periods[i] = period;
        tacheNom[i] = task_name; 

        y+= saut;
    }
    console.log(tache);
    console.log(tacheNom); 
    console.log("length " + tasks.length); 
    console.log("périodes: "+periods)


    nbr = timeUnitEvent.getTaskNbr(tasks.length); 
    Task.changeColor(nbr);
    c_len = tasks.length + 2;


    // récupérer les ressources

    resource = xmlDoc1.getElementsByTagName("np_resource");
    if(resource.length !=0){
        resource_name = resource[0].getElementsByTagName("name")[0].textContent;

         let share_res = xmlDoc1.getElementsByTagName("critical_sections");
        let resTab = [];
   
        for (let i=0; i<=share_res.length; i++){
            let task_begin = share_res[0].getElementsByTagName("task_begin")[i].textContent;
            let task_end = share_res[0].getElementsByTagName("task_end")[i].textContent;
            let task_res = share_res[0].getElementsByTagName("task_name")[i].textContent;
        
            resTab[i] = new Resource(task_res, task_begin, task_end); 
        }   

        console.log(resource_name);
        console.log(resTab, "nbr res : "+resource.length );
    }
    
}


function drawEvent(){
   let xmlDoc = xmlhttp.responseXML;
    console.log(xmlhttp.responseXML); // vérifier si réponse non null 

    let t = xmlDoc.getElementsByTagName("time_unit");  
    let event = xmlDoc.getElementsByTagName("time_unit_event");

    // define max time
    max_upto = t[event.length-1].textContent;
    console.log("max: "+max_upto);

    // draw upto max_time
    upto = Number(document.getElementById("draw_upto").value);
    if(upto > max_upto || (upto == 0 || upto === "undefined")){
        upto = max_upto;
        document.getElementById("draw_upto").value = max_upto;
        alert(max_upto + " is the maximum time unit for this simulation."); 
    }
    console.log("upto: "+upto);

    // dessiner les lignes de temps
    if(!isNaN(upto)){
        // TASK
        timeUnitEvent.drawTimeLine(tacheNom.length+2, cote, tiret, unit, c_width, upto);
        console.log('len = '+tacheNom.length+2);

        // RESOURCE
        if(resource.length != 0){
            y_d = baseY+(tacheNom.length+1)*saut; 
            Resource.drawTimeLine(resource.length+1, cote, tiret, unit, upto, y_d);
            y_d+= 2*saut; 
        }
    }else{
        console.log("upto est non valide !");
    }

    // ajouter nom sur Canvas
    let y = baseX + decalage;
    for(let i=0; i< tacheNom.length; i++){
        ctx.font = "16px Arial";
        ctx.fillStyle = "black"; // Couleur du texte
        ctx.textAlign = "left"; // Alignement du texte
        ctx.fillText(tacheNom[i], x_nomTache, y);
        y+= saut;
    }
    ctx.fillText(resource_name, x_nomTache, y_d);

    const eventTab = [event.length]; 
    y = baseX + decalage;
    let from_unit; 
  
    for(let i=0; i<event.length; i++){
        let time_unit = t[i].textContent; 
        let event_type = event[i].getElementsByTagName("type_of_event")[0].textContent;
        let task_id;
        let core_name;
        if(event_type === "RUNNING_TASK"){
            task_id = event[i].getElementsByTagName("running_task")[0].getAttribute('ref');
            core_name = event[i].getElementsByTagName("running_core")[0].textContent;
        } 
        if(event_type === "TASK_ACTIVATION"){
            task_id = event[i].getElementsByTagName("activation_task")[0].getAttribute('ref');
            tacheID[i]  = task_id;
        }
        if(event_type === "ALLOCATE_RESOURCE"){
            task_id = event[i].getElementsByTagName("allocate_task")[0].getAttribute('ref');
            from_unit = time_unit;
        }
        if(event_type === "RELEASE_RESOURCE"){
            task_id = event[i].getElementsByTagName("release_task")[0].getAttribute('ref');
        }
        
        eventTab[i] = new timeUnitEvent(time_unit, core_name, task_id, event_type);
        
        if(event_type === "RUNNING_TASK"){
            eventTab[i].drawTaskZone(y, nbr,cote, tiret, upto);
        } 
        if(event_type === "RELEASE_RESOURCE"){
            let long = (time_unit-from_unit)*cote;
            console.log("Dessin "+y_d, from_unit +" -> " +time_unit);
            eventTab[i].drawAccessRes(y_d, cote, tiret, upto, from_unit, long);
        }
    }

    console.log(eventTab); 
    console.log(tacheID);

    for(let j=0; j<periods.length; j++){
        Task.drawPeriod(limite_line, j); 
    }

    Task.changePeriodColor();
    Resource.changeResColor();
} 

function erase(){
    // effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Réinitialiser les champs de formulaire
    const tab = ["event_table", "system_model","draw_upto"];
    for (let i = 0; i < tab.length; i++) {
        document.getElementById(tab[i]).value = "";
    }
    
    // Vider la table
    Task.clearTable();
} 

function bigger(){
    if(cote==15 && (tiret==8 && unit==4)){
        c_width += add_c_width;
    } else {
        c_width = document.getElementsByClassName("myCanvas")[0].width + add_c_width;
    }
    
    cote += add;
    tiret+= add; 
    unit += add;
    pos_y += add; 
    
    // dessiner les lignes de temps agrandies
    fetchData();
    console.log("new width "+c_width);

    // dessiner les événements
    drawEvent();
}



function smaller(){
    cote -= add;
    tiret-= add; 
    unit -= add;
    pos_y -= add;
    c_width = document.getElementsByClassName("myCanvas")[0].width - add_c_width;
    console.log("new width "+c_width);

    // dessiner les lignes de temps réduites
    fetchData(); 

    // dessiner les événements
    drawEvent();
}


function getURL1(){
    document.getElementById("system_model").value = ex1[0];
    document.getElementById("event_table").value = ex1[1];
}

function getURL2(){
    document.getElementById("system_model").value = ex2[0];
    document.getElementById("event_table").value = ex2[1];
}

function getURL3(){
    document.getElementById("system_model").value = ex3[0];
    document.getElementById("event_table").value = ex3[1];
}