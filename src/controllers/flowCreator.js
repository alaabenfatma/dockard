import dagre from 'dagre';
export class FlowCreator {
    constructor(json_data) {
        this.json_data = json_data;
    }


    _nodeStyle(color) {
        return {
            borderRadius: '5px',
            background: color,
            color: 'black',
            width: 'max-content',
            height: 'max-content',
            boxShadow: '10 10 10px #add2ecc2',
            border: '1px solid #add2ecc2'
        };
    }
    createFlow() {
        if (this.json_data === undefined || this.json_data === null
            || Object.keys(this.json_data).length === 0) {
            return null;
        }
        this.nodes = [];
        this.edges = [];
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
        // Create init node
        let init_node = {
            id: 'init',
            sourcePosition: 'right',
            data: { label: 'docker-compose' },

        };
        this.nodes.push(init_node);
        // Create a node for each service
        for (let i = 0; i < num_services; i++) {
            let service, id, name, ports, volumes, depends_on, image, build, command, environment, labels, networks, restart, stdin_open, tty, user, working_dir;
            try {
                service = services_array[i];
                id = Object.keys(services)[i];
                name = service["name"] === (undefined || null) ? id : service["name"];
                ports = service["ports"] === (undefined || null) ? [] : service["ports"];
                depends_on = service["depends_on"] === (undefined || null) ? [] : service["depends_on"];
                volumes = service["volumes"] === (undefined || null) ? [] : service["volumes"];
                image = service["image"] === (undefined || null) ? "" : service["image"];
                build = service["build"] === (undefined || null) ? "" : service["build"];
                command = service["command"] === (undefined || null) ? "" : service["command"];
                environment = service["environment"] === (undefined || null) ? [] : service["environment"];
                labels = service["labels"] === (undefined || null) ? [] : service["labels"];
                networks = service["networks"] === (undefined || null) ? [] : service["networks"];
                restart = service["restart"] === (undefined || null) ? "" : service["restart"];
                stdin_open = service["stdin_open"] === (undefined || null) ? "" : service["stdin_open"];
                tty = service["tty"] === (undefined || null) ? "" : service["tty"];
                user = service["user"] === (undefined || null) ? "" : service["user"];
                working_dir = service["working_dir"] === (undefined || null) ? "" : service["working_dir"];

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
                    label:
                        <span style={{ alignItems: 'center' }}>
                            <p style={{
                                position: 'relative',
                            }}><img src="https://img.icons8.com/doodle/96/000000/docker.png" alt="docker container"
                                style={{ width: "24px", height: "24px" }} />
                                <div><strong>{id}</strong></div></p>
                        </span>
                },


                style: this._nodeStyle('#add2ecc2'),
            };
            this.nodes.push(node);

            // Create 'ports' node
            if (ports !== undefined && ports !== null && ports.length > 0) {
                let ports_node = {
                    id: id + '_ports',
                    sourcePosition: 'right',
                    targetPosition: 'left',
                    data: {
                        type: 'ports',
                        label:
                            <>
                                {<p>{ports.length} ports mapping</p>}
                            </>
                    },


                    style: this._nodeStyle('#b9defcc2'),
                };
                this.nodes.push(ports_node);
                this.edges.push({
                    id: id + '_ports_edge',
                    source: id,
                    target: id + '_ports',
                });
            }


            // Convert environment variables to an array
            if (environment !== undefined && environment !== null) {
                let environment_array = Object.values(environment);
                let environment_node = {
                    id: id + '_environment',
                    sourcePosition: 'right',
                    targetPosition: 'left',
                    data: {
                        type: 'environment',
                        label:
                            <span>
                                {<p>{environment_array.length} environment variables</p>}
                            </span>
                    },
                    variables: environment,
                    style: this._nodeStyle('#b9defcc2'),


                };
                this.nodes.push(environment_node);
                this.edges.push({
                    id: id + '_environment_edge',
                    source: id,
                    target: id + '_environment',
                });


            }
            // Create the dependency edges between the nodes
            if (depends_on !== undefined && depends_on !== null) {
                let dependencies = Object.values(depends_on);
                dependencies.forEach(dependency => {
                    this.edges.push({
                        id: id + '_' + dependency + '_edge',
                        source: id,
                        target: dependency,
                        animated: true,
                        style: { stroke: '#03d1f5c2' },
                        markerEnd: { type: 'arrow', color: '#03d1f5c2' },
                        label: `'${id}' depends on '${dependency}'`,
                        sourceHandle: 'right',
                    });
                });

            }

        }


        // Create edges with init node for each service
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id.indexOf('_') !== -1 || this.nodes[i].id === 'init') {
                //console.log(`Skipping ${this.nodes[i].id}`);
                continue;
            }
            let edge = {
                id: 'init-' + this.nodes[i].id,
                source: 'init',
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
                        <img src="https://img.icons8.com/bubbles/100/000000/error.png" alt="error icon"
                             width="64" height="64" />
                        <p>{message}</p>
                    </>

            },
            style: {
                background: "white", onmouseenter: 'background = "#cf5858"'
            },

            position: { x: 0, y: 0 },
        };
        return node;
    }

    getLayoutedElements(nodes, edges, direction = 'TB') {
        const dagreGraph = new dagre.graphlib.Graph();
        dagreGraph.setDefaultEdgeLabel(() => ({}));
        const nodeWidth = 128;
        const nodeHeight = 128;

        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        nodes.forEach((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? 'left' : 'top';
            node.sourcePosition = isHorizontal ? 'right' : 'bottom';

            node.position = {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            };

            return node;
        });

        return { nodes, edges };
    };
}
