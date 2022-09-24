/*
    Test the FlowCreator class using Jest
    */


import { FlowCreator } from '../controllers/flowCreator';

// Test basic hello world docker-compose yaml file
test('Test basic edges hello world docker-compose yaml file', () => {
  let docker_compose_yaml_json =
  {
    "version": "3.9",
    "services": {
      "hello": {
        "image": "postgres"
      },
      "world": {
        "build": "."
      }
    }
  }
  let expected_edges = [
    {
      "id": "init-init",
      "source": "init",
      "type": "smoothstep",
      "target": "init",
      "animated": false
    },
    {
      "id": "init-hello",
      "source": "init",
      "type": "smoothstep",
      "target": "hello",
      "animated": false
    },
    {
      "id": "init-world",
      "source": "init",
      "type": "smoothstep",
      "target": "world",
      "animated": false
    }
  ]

  let flowCreator = new FlowCreator(docker_compose_yaml_json);
  let flow = flowCreator.createFlow();
  expect(flow.edges).toEqual(expected_edges);
});

// Test the _nodeStyle function
test('Test the _nodeStyle function', () => {
  let flowCreator = new FlowCreator({});
  let expected_nodeStyle = {
    borderRadius: '5px',
    background: '#add2ecc2',
    color: 'black',
    width: 'max-content',
    height: 'max-content',
    boxShadow: '10 10 10px #add2ecc2',
    border: '1px solid #add2ecc2'
  }
  expect(flowCreator._nodeStyle('#add2ecc2')).toEqual(expected_nodeStyle);
});