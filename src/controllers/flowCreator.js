// import mui icons
export class FlowCreator {
    constructor(json_data) {
        this.json_data = json_data;
    }



    createFlow() {
        console.log(Object.keys(this.json_data));
        if (this.json_data === undefined || this.json_data === null
            || Object.keys(this.json_data).length === 0) {
            return null;
        }
        this.nodes = [];
        this.edges = [];
        // Print type of json_data
        console.log(typeof this.json_data);
        // Find the "services" node in the JSON data
        let services = this.json_data["services"];
        if (services === undefined || services === null) {
            console.log("No services found");
            return null;
        }
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
            let service, id, name, ports, volumes, depends_on;
            try {
                service = services_array[i];
                id = Object.keys(services)[i];
                name = service["name"] === (undefined || null) ? id : service["name"];
                ports = service["ports"] === (undefined || null) ? [] : service["ports"];
                depends_on = service["depends_on"] === (undefined || null) ? [] : service["depends_on"];
            }
            catch (err) {
                console.log(err);

                return null;
            }
            let node = {
                id: id,
                sourcePosition: 'right',
                targetPosition: 'left',
                data: {
                    label: id,
                    ports: ports,
                },
                ports: ports,
                position: { x: 200, y: this.nodes.length * 100 },
            };
            if (ports.length > 0) {
                let ports_node = {
                    id: id + '_ports',
                    sourcePosition: 'right',
                    targetPosition: 'left',
                    data: {
                        label:
                            <>
                                <img src='https://www.svgrepo.com/show/292040/usb-port.svg' alt="port" width="20" height="20" />
                                <p>Ports</p>
                                {ports.map(port => {
                                    return (
                                        <>
                                            <p>{port}</p>
                                        </>
                                    )
                                })}
                            </>

                    },
                    style: { background: '#c52b2b', onmouseenter: 'background = "#cf5858"' },

                    position: { x: 400, y: this.nodes.length * 100 },
                };
                this.nodes.push(ports_node);
                this.edges.push({
                    id: id + '_ports_edge',
                    source: id,
                    target: id + '_ports',
                });
            }
            this.nodes.push(node);
        }


        // Create edges with init node for each service
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id.indexOf('_ports') !== -1) {
                console.log(`Skipping ${this.nodes[i].id}`);
                continue;
            }
            let edge = {
                id: 'init-' + this.nodes[i].id,
                source: 'init',
                type: 'smoothstep',
                target: this.nodes[i].id,
                animated: false,
            };
            this.edges.push(edge);
        }



        return { nodes: this.nodes, edges: this.edges };
    }

    // Create an error node
    createErrorNode(message) {
        let node = {
            id: 'error',
            sourcePosition: null,
            targetPosition: null,
            data: {
                label:
                    <> 
                        <img src="https://img.icons8.com/bubbles/100/000000/error.png"
                            alt="error" width="64" height="64" />
                        <p>{message}</p>
                    </>

            },
            style: { 
                background: "white", onmouseenter: 'background = "#cf5858"' },

            position: { x: 0, y: 0 },
        };
        return node;
    }
}
