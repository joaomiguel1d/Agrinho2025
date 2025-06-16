let cityPeople = [];
let ruralPeople = [];
let phones = [];
let entregando = false;

function setup() {
  createCanvas(800, 400);

  // Criar pessoas da cidade
  for (let i = 0; i < 3; i++) {
    cityPeople.push({ x: 50, y: 100 + i * 100 });
  }

  // Criar pessoas do campo
  for (let i = 0; i < 3; i++) {
    ruralPeople.push({ x: 700, y: 100 + i * 100 });
  }

  // Criar celulares
  for (let i = 0; i < 3; i++) {
    phones.push({
      x: cityPeople[i].x + 30,
      y: cityPeople[i].y - 10,
      targetX: ruralPeople[i].x - 30,
      targetY: ruralPeople[i].y - 10,
      delivered: false
    });
  }

  // Botão para iniciar entrega
  let botao = createButton("Entregar Celulares");
  botao.position(10, 10);
  botao.mousePressed(() => {
    entregando = true;
  });
}

function draw() {
  background(220);
  drawBackground();

  // Pessoas da cidade
  for (let p of cityPeople) {
    drawPerson(p.x, p.y, 'blue');
  }

  // Pessoas do campo
  for (let p of ruralPeople) {
    drawPerson(p.x, p.y, 'green');
  }

  // Celulares
  for (let phone of phones) {
    if (entregando && !phone.delivered) {
      let dx = phone.targetX - phone.x;
      let dy = phone.targetY - phone.y;
      let dist = sqrt(dx * dx + dy * dy);
      if (dist > 1) {
        phone.x += dx * 0.02;
        phone.y += dy * 0.02;
      } else {
        phone.delivered = true;
      }
    }

    // Desenhar celular
    fill(0);
    rect(phone.x, phone.y, 10, 20, 3);

    // Brilho quando entregue
    if (phone.delivered) {
      fill(255, 255, 0, 150);
      ellipse(phone.x + 5, phone.y + 10, 30, 30);
    }
  }
}

function drawPerson(x, y, color) {
  fill(color);
  ellipse(x, y, 30, 30); // cabeça
  line(x, y + 15, x, y + 50); // corpo
  line(x, y + 25, x - 10, y + 40); // braço esquerdo
  line(x, y + 25, x + 10, y + 40); // braço direito
  line(x, y + 50, x - 10, y + 70); // perna esquerda
  line(x, y + 50, x + 10, y + 70); // perna direita
}

function drawBackground() {
  // Cidade
  fill(180);
  rect(0, 0, width / 2, height);
  for (let i = 0; i < 3; i++) {
    fill(100);
    rect(30 + i * 60, 50, 40, 100 + i * 30);
  }

  // Campo
  fill(160, 240, 160);
  rect(width / 2, 0, width / 2, height);
  for (let i = 0; i < 3; i++) {
    fill(34, 139, 34);
    triangle(600 + i * 50, 200, 580 + i * 50, 300, 620 + i * 50, 300);
  }
}


