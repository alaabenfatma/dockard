export class FlowCreator {
    constructor(json_data) {
        this.json_data = json_data;
    }



    createFlow() {
        if (this.json_data === undefined || this.json_data === null) {
            return;
        }
        this.nodes = [];
        this.edges = [];
        // Print type of json_data
        console.log(typeof this.json_data);
        // Find the "services" node in the JSON data
        let services = this.json_data["services"];
        // Convert the services node to an array
        let services_array = Object.values(services);
        // Count the number of services
        let num_services = Object.keys(services).length;
        console.log("Number of services: " + num_services);

        // Create init node
        let init_node = {
            id: 'init',
            sourcePosition: 'right',
            data: { label: 'docker-compose' },
            position: { x: 0, y: num_services * 50 + 50 },
        };
        this.nodes.push(init_node);
        // Create a node for each service
        for (let i = 0; i < num_services; i++) {
            let service = services_array[i];
            let id = Object.keys(services)[i];
            let name = service["name"] === null ? id : service["name"];
            let ports = service["ports"] === undefined ? [] : service["ports"];
            let depends_on = service["depends_on"] === undefined ? [] : service["depends_on"];

            let node = {
                id: id,
                sourcePosition: 'right',
                targetPosition: 'left',
                data: { label: id },
                position: { x: 200, y: this.nodes.length * 100 },
            };
            this.nodes.push(node);
        }


        // Create edges with init node for each service
        for (let i = 1; i < num_services+1; i++) {
            let edge = {
                id: 'init-' + this.nodes[i].id,
                source: 'init',
                type: 'smoothstep',
                target: this.nodes[i].id,
                animated: true,
            };
            this.edges.push(edge);
        }



        return { nodes: this.nodes, edges: this.edges };
    }
}
