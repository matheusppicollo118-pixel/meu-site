import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const { nome, email, segmento, modelo } = req.body;

  if (!email || !segmento) {
    return res.status(400).json({ message: "E-mail e segmento obrigatórios." });
  }

  const ideias = [
    { title: "Marketing rápido", body: "Use catálogo no WhatsApp e anúncios locais." },
    { title: "Posicionamento claro", body: "Mostre benefícios diretos, não só o produto." },
    { title: "Escala inicial", body: "Crie um produto mínimo e teste semanalmente." },
  ];

  let html = <p>Olá ${nome || "empreendedor"}, aqui estão suas 3 ideias para <strong>${segmento}</strong>:</p>;
  ideias.forEach(i => {
    html += <p><strong>${i.title}</strong>: ${i.body}</p>;
  });

  try {
    await sgMail.send({
      to: email,
      from: "contato@seudominio.com", // use o e-mail verificado no SendGrid
      subject: Suas ideias para ${segmento} já estão aqui!,
      html,
    });
    res.status(200).json({ message: "E-mail enviado!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Erro ao enviar e-mail." });
  }
}