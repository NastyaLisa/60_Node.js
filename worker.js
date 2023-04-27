import {workerData, parentPort} from 'worker_threads';

const reversed = workerData.split('').reverse().join('');

parentPort.postMessage(reversed);
