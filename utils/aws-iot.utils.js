import { iot } from "aws-iot-device-sdk-v2";
import { once } from "events";
import { toUtf8 } from '@aws-sdk/util-utf8-browser';

import { IOT_HOST, certPath, keyPath } from "./constantes";

function getConfiguration() {
    let builder = iot.AwsIotMqtt5ClientConfigBuilder.newDirectMqttBuilderWithMtlsFromPath(
        IOT_HOST,
        certPath,
        keyPath
    );

    builder.withConnectProperties({
        keepAliveIntervalSeconds: 1200
    });

    return builder.build();
}

export function crearCliente() {

}

export async function closeClient(client) {
    let unsuback = await client.unsubscribe({
        topicFilters: [
            "hello/world/qos1"
        ]
    });
    console.log('Unsuback result: ' + JSON.stringify(unsuback));

    // const stopped = once(client, "stopped");

    client.stop();

    // await stopped;

    client.close();
}

export function createClient() {
    const client = new mqtt5.Mqtt5Client(getConfiguration());

    client.on('error', (error) => {
        // console.log("\n\nError event: " + error.toString());
    });

    client.on('attemptingConnect', (eventData) => {
        // console.log("\n\nAttempting Connect event");
    });


    client.on('connectionFailure', (eventData) => {
        // console.log("\n\nConnection failure event: " + eventData.error.toString());
        if (eventData.connack) {
            // console.log ("Connack: " + JSON.stringify(eventData.connack));
        }
    });

    client.on('disconnection', (eventData) => {
        // console.log("\n\nDisconnection event: " + eventData.error.toString());
        if (eventData.disconnect !== undefined) {
            // console.log('\n\nDisconnect packet: ' + JSON.stringify(eventData.disconnect));
        }
    });

    client.on('stopped', (eventData) => {
        // console.log("\n\nStopped event");
    });

    return client;
}