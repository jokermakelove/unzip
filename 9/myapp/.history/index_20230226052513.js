const { Cluster } = require('puppeteer-cluster');
const { UI } = require('puppeteer-cluster-ui');

const cluster = await Cluster.launch({
  concurrency: Cluster.CONCURRENCY_CONTEXT,
  maxConcurrency: 10,
  puppeteerOptions: {
    headless: true,
  },
});

const ui = new UI(cluster, {
  port: 3000,
});

await ui.init();
