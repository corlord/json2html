let jOb = JSON.parse(document.body.textContent);
const root = document.body;

function eval_json(j_obj, root_node){
    if (Array.isArray(j_obj)){
        var list_label = root_node.children[0].className        
        for (var j in j_obj){
            var element = document.createElement("div");
            root_node.appendChild(element);
            element.className = list_label + j
            eval_json(j_obj[j], element);
        }
        
    } else {
        build_nodes(j_obj, root_node);
    };
};

function build_nodes(j_obj, root_node){
    for(var k in j_obj){
        element = document.createElement("div");
        root_node.appendChild(element);
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
