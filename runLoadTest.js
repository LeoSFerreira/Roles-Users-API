const autocannon = require('autocannon');
const fs = require('fs');
const pidusage = require('pidusage');
const url = 'http://localhost:3000/users';
const body = fs.readFileSync('./body.json', 'utf-8');
const headers = {
  'Content-Type': 'application/json',
  'Origin': 'http://localhost:3000',
  'Cookie': '_csrf=1bCQ_PsnAOxUaw-swPYOfHQR; accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTA1MjY0MzEsImV4cCI6MTc1MDUzMDAzMSwic3ViIjoiYzhkYTc2YjUtOWYwNC00OTI5LWI4YjktMWJlNTNiYTJiNjYyIn0.AfuA3F_nRawe95meh4RPd77uYj7zrVGlzyR6VsXg2Bc',
  'X-CSRF-Token': 'J19PKVLj-cBL5N-K0qUDhVej7NrFrBpoTqHs'
};

const instance = autocannon({
  url: 'http://localhost:3000/xss-test?search=<script>alert(1)</script>',
  connections: 10,
  duration: 30,
  method: 'GET',
  headers,
  body
}, (err, result) => {
  if (err) console.error(err);
  else console.log('Teste finalizado.', result);
  process.exit();
});

function monitorCPU(pid, intervalMs = 1000) {
  console.log(`Monitorando CPU e memória do PID ${pid} a cada ${intervalMs}ms...`);

  let cpuSum = 0;
  let memSum = 0;
  let samples = 0;

  const timer = setInterval(() => {
    pidusage(pid, (err, stats) => {
      if (err) {
        console.error('Erro pidusage:', err);
        return;
      }
      cpuSum += stats.cpu;
      memSum += stats.memory;
      samples++;

      console.log(`CPU: ${stats.cpu.toFixed(2)}% | Memória: ${(stats.memory / 1024 / 1024).toFixed(2)} MB`);
    });
  }, intervalMs);

  instance.on('done', () => {
    clearInterval(timer);
    pidusage.clear();

    const cpuAvg = cpuSum / samples;
    const memAvgMB = (memSum / samples) / 1024 / 1024;

    console.log('--- Média final durante o teste ---');
    console.log(`CPU média: ${cpuAvg.toFixed(2)}%`);
    console.log(`Memória média: ${memAvgMB.toFixed(2)} MB`);
  });
}
const serverPID = 14244;
monitorCPU(serverPID);
