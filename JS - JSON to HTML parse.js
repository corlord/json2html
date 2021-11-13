let jOb = JSON.parse(document.body.textContent);
const root = document.body;

// Evaluates immediate json objects to determine if it is an array
// True: Iterates through the array creates sub node and retests array items
// False: Sends to build_nodes to create elements based on key/values.
function eval_json(j_obj, root_node){
    if (Array.isArray(j_obj)){    
        for (var j in j_obj){
            var element = document.createElement("div");
            root_node.appendChild(element);
            element.className = "list_item" + j
            eval_json(j_obj[j], element);
        }
        
    } else {
        build_nodes(j_obj, root_node);
    };
};

// Iterates through key/value pairs to create span nodes to hold each separately under a unique parent, uses key value as classname in elements to help xpath parsing. 
// If arrays or additional json objects are encountered, calls the appropriate function to handle.
function build_nodes(j_obj, root_node){
    for(var k in j_obj){
        var element = document.createElement("div");
        root_node.appendChild(element);
        element.className = k;
        
        element_span1 = document.createElement("span");
        element_span1.innerText = k;
        element_span1.className = k;
        element_span1.style.padding = "25px";
        element.appendChild(element_span1);
        if (Array.isArray(j_obj[k])){
            eval_json(j_obj[k], element);
        } else if (typeof j_obj[k] === "object") {
            build_nodes(j_obj[k], element);

        } else {
        element_span2 = document.createElement("span");
        element_span2.innerText = j_obj[k];
        element.appendChild(element_span2);
        };
    };
};

eval_json(jOb, root);
