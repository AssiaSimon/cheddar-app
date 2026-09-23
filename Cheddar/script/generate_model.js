let add_taskName,
add_period, 
add_deadline, 
add_capacity;

// compter le nombre de tâches ajoutées
let nbrTask = 0; 

// tableau pour stocker les nouvelles tâches
let added_tasks = [];

// compter le nombre de tâches sauvegardées
let nbr_saved = 0;

// valeurs fixes
const add_cpu_name = "CPU_01";
const add_task_type = "PERIODIC_TYPE";

// attribution id pour les nouvelle stâches
let add_id; 

// compteur de l'id tâche à partir de 16
let id_cpt = 16; 

function addInputs(){
    const addingZone = document.getElementById("addingZone");
    const tr = document.createElement("tr");
    tr.classList.add("content");

    tr.innerHTML = "<tr><td class='content'><label for='add_taskName"+nbrTask+"'>Task Name</label>"+
    "<input type='text' id='add_taskName"+nbrTask+"' name='add_taskName' size='10' style='margin-right: 10px;'>"+
    "<label for='add_period"+nbrTask+"'>Period</label><input type='text' id='add_period"+nbrTask+
    "' name='add_period' size='5' style='margin-right: 10px;'>"+
    "<label for='add_deadline"+nbrTask+"'>Deadline</label><input type='text' id='add_deadline"+nbrTask+
    "' name='add_deadline' size='5' style='margin-right: 10px;'>"+
    "<label for='add_capacity"+nbrTask+"'>Capacity</label><input type='text' id='add_capacity"+nbrTask+
    "' name='add_capacity' size='5'></td></tr>";

    addingZone.appendChild(tr);
    nbrTask += 1; 
}

function removeInputs(){
    if (addingZone.lastElementChild) {
        const addingZone = document.getElementById("addingZone");
        addingZone.removeChild(addingZone.lastElementChild);
        nbrTask -= 1; 
        
        // Supprimer la dernière tâche dans added_tasks
        added_tasks.pop();
        
        console.log(" added_tasks.length = "+added_tasks.length)
    }
}

function saveModel(){
    let affiche = ""; 
    let reg_nbr = /^[0-9]+$/; 
    let reg_name = /^[\w]+$/; 

    let id_name, id_period, id_deadline, id_capacity; 

    for(let i=0; i<nbrTask; i++){
        id_name = "add_taskName"+i; 
        id_period = "add_period"+i; 
        id_deadline = "add_deadline"+i; 
        id_capacity = "add_capacity"+i; 
    
        add_taskName = document.getElementById(id_name).value;
        add_period = document.getElementById(id_period).value;
        add_deadline = document.getElementById(id_deadline).value;
        add_capacity = document.getElementById(id_capacity).value;

        if((add_taskName == "" || add_period == "" ) || 
        (add_deadline == "" || add_capacity == "")){
            affiche+="All fields are required ! \n"; 
        }

        if(!reg_name.test(add_taskName) && add_taskName != ""){
            affiche+="Task Name  must not contain space ! \n";
        }
        if(( (!reg_nbr.test(add_period) && add_period != "" )||
        (!reg_nbr.test(add_capacity) && add_capacity != "") ) || (
        (!reg_nbr.test(add_deadline) && add_deadline != "")) ){
            affiche+="Period, Deadline, and Capacity  must be numbers ! \n";
        }

        if (add_period != add_deadline){
            affiche+="Period and Deadline must be identical ! \n";
        }
    }

    if(affiche != ""){
        alert(affiche);
    }else{
        
        for(let i=0; i<nbrTask; i++){
            // définir id 
            add_id = "id_" + id_cpt;

            id_name = "add_taskName"+i; 
            id_period = "add_period"+i; 
            id_deadline = "add_deadline"+i; 
            id_capacity = "add_capacity"+i; 
    
            add_taskName = document.getElementById(id_name).value;
            add_period = document.getElementById(id_period).value;
            add_deadline = document.getElementById(id_deadline).value;
            add_capacity = document.getElementById(id_capacity).value;

            // créer une tâche
            added_tasks[i] = new Task(add_id, add_taskName, add_task_type, add_period, 
            add_capacity, add_deadline, add_cpu_name); 
        
            // afficher nbr de tâches enregistrées
            nbr_saved = i+1;
            id_cpt += Number(1);

            affiche = "<p>__"+nbr_saved+" Task(s) saved.</p>"; 
        }
        
        document.getElementById("data_display").innerHTML = affiche;  
    }
    console.log(added_tasks);

}


// Récupère le fichier XML à modifier

let xmlhttp2= new XMLHttpRequest();

function loadXMLData(){
    xmlhttp2.onreadystatechange = function(){
        if(xmlhttp2.readyState == 4 && xmlhttp2.status == 200){
            getData(); 
        }
    }   
    xmlhttp2.open("GET","../xml/new_system_model.xml", true); // chemin d'accès au fichier XML
    xmlhttp2.send(); 
}

function getData(){
    let xmlDoc2 = xmlhttp2.responseXML; 
    console.log(xmlhttp2.responseXML); // vérifier si réponse non null
    let balise_tasks = xmlDoc2.getElementsByTagName("tasks");
    let periodic_task, object_type, name, task_type, cpu_name, address_space_name, 
    capacity, deadline, priority, blocking_time, policy, text_memory_size, 
    text_memory_start_address, stack_memory_size, criticality, context_switch_overhead,
    cfg_relocatable, cache_access_profile_name, mils_confidentiality_level, 
    mils_integrity_level, mils_component, mils_task, mils_compliant, access_memory_number,
    maximum_number_of_memory_request_per_job, period, jitter, every;

    let xmlString ; 
    
    for(let i=0; i<added_tasks.length; i++){
        
        periodic_task = document.createElement('periodic_task');
        balise_tasks[0].append(periodic_task);
        periodic_task.setAttribute("id", added_tasks[i].id); 

        object_type = document.createElement('object_type');
        object_type.textContent = "TASK_OBJECT_TYPE";
        periodic_task.appendChild(object_type);
        
        name = document.createElement('name');
        name.textContent = added_tasks[i].taskName; 
        periodic_task.appendChild(name);

        task_type = document.createElement('task_type');
        task_type.textContent = added_tasks[i].taskType;
        periodic_task.appendChild(task_type);

        cpu_name = document.createElement('cpu_name'); 
        cpu_name.textContent = "CPU_01";
        periodic_task.appendChild(cpu_name);

        address_space_name = document.createElement('address_space_name'); 
        address_space_name.textContent = "Address_Space_01";
        periodic_task.appendChild(address_space_name);

        capacity = document.createElement('capacity'); 
        capacity.textContent = added_tasks[i].capacity;
        periodic_task.appendChild(capacity);

        deadline = document.createElement('deadline');
        deadline.textContent = added_tasks[i].deadline;
        periodic_task.appendChild(deadline);

        start_time = document.createElement('start_time');
        start_time.textContent = "0";
        periodic_task.appendChild(start_time);

        priority = document.createElement('priority');
        priority.textContent = "1";
        periodic_task.appendChild(priority);

        blocking_time = document.createElement('blocking_time');
        blocking_time.textContent = "0";
        periodic_task.appendChild(blocking_time);

        policy = document.createElement('policy');
        policy.textContent = "SCHED_FIFO";
        periodic_task.appendChild(policy);

        text_memory_size = document.createElement('text_memory_size');
        text_memory_size.textContent = "0";
        periodic_task.appendChild(text_memory_size);

        text_memory_start_address = document.createElement('text_memory_start_address');
        text_memory_start_address.textContent = "0";
        periodic_task.appendChild(text_memory_start_address);

        stack_memory_size = document.createElement('stack_memory_size');
        stack_memory_size.textContent = "0";
        periodic_task.appendChild(stack_memory_size);

        criticality = document.createElement('criticality');
        criticality.textContent = "0";
        periodic_task.appendChild(criticality);

        context_switch_overhead = document.createElement('context_switch_overhead');
        context_switch_overhead.textContent = "0";
        periodic_task.appendChild(context_switch_overhead);

        cfg_relocatable = document.createElement('cfg_relocatable');
        cfg_relocatable.textContent = "FALSE";
        periodic_task.appendChild(cfg_relocatable);

        cache_access_profile_name = document.createElement('cache_access_profile_name');
        cache_access_profile_name.textContent = "CAP_3";
        periodic_task.appendChild(cache_access_profile_name);

        mils_confidentiality_level = document.createElement('mils_confidentiality_level');
        mils_confidentiality_level.textContent = "TOP_SECRET";
        periodic_task.appendChild(mils_confidentiality_level);

        mils_integrity_level = document.createElement('mils_integrity_level');
        mils_integrity_level.textContent = "HIGH";
        periodic_task.appendChild(mils_integrity_level);

        mils_component = document.createElement('mils_component');
        mils_component.textContent = "SLS";
        periodic_task.appendChild(mils_component);

        mils_task = document.createElement('mils_task');
        mils_task.textContent = "APPLICATION";
        periodic_task.appendChild(mils_task);

        mils_compliant = document.createElement('mils_compliant');
        mils_compliant.textContent = "TRUE";
        periodic_task.appendChild(mils_compliant);
        
        access_memory_number = document.createElement('access_memory_number');
        access_memory_number.textContent = "0";
        periodic_task.appendChild(access_memory_number);

        maximum_number_of_memory_request_per_job = 
        document.createElement('maximum_number_of_memory_request_per_job');
        maximum_number_of_memory_request_per_job.textContent = "0";
        periodic_task.appendChild(maximum_number_of_memory_request_per_job);

        period = document.createElement('period');
        period.textContent = added_tasks[i].period;
        periodic_task.appendChild(period);

        jitter = document.createElement('jitter');
        jitter.textContent = "0";
        periodic_task.appendChild(jitter);

        every = document.createElement('every');
        every.textContent = "0";
        periodic_task.appendChild(every);


        // transformer periodic_task en chaîne XML, utilise un XMLSerializer 
        // transformation DOM ➝ string
        const serializer = new XMLSerializer();
        
        //renvoie une chaîne XML représentant cet élément, avec tous ses attributs et sous-éléments
        xmlString = serializer.serializeToString(periodic_task);
        console.log(xmlString); 
    }

    // sérialisez TOUT le document XML modifié
    const serializer = new XMLSerializer();
    xmlString = serializer.serializeToString(xmlDoc2);

    // créer un objet Binary Large Object qui stocke les données
    //[xmlString] : crée un bllob à partir d'un tableau contenant la chaine XML générée
    // application/ : indique que le contenu est uen application structurée contrairement à
    //                text/ qui du text brut.
    //     -> des programmes peuvent lire, analyser ou traiter du contenu
    // xml : format xml 
    const blob = new Blob([xmlString], { type: "application/xml" });
    
    // créer une URL temporaire qui pointe vers le contenu du blob
    const url = URL.createObjectURL(blob);

    // crée un élement <a> (lien HTML) dynamiquement avec JavaScript
    const downloadLink = document.createElement("a");

    // attribue au lien la URL blob générée
    downloadLink.href = url;

    // ajouter la classe
    downloadLink.classList.add("links");

    // attribue un nom de fichier par défaut lors du téléchargement
    // le navigateur télécharge le fichier sous ce nom, au lieu de l'ouvrir
    downloadLink.download = "new_system_model.xml";

    // définit le texte visible du lien
    downloadLink.textContent = "Download Generated XML File";

    // ajoute le lien de téléchargement comme elmt enfant
   
    document.getElementById("data_display").appendChild(downloadLink); 

    // supprime la 1ere ligne
    const tableBody1 =  document.getElementById("data_display"); 
    tableBody1.removeChild(tableBody1.firstElementChild);
}

    