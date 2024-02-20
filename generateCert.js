const forge = require('node-forge');
const fs = require('fs');

function generateCertificate() {
  // สร้างคู่คีย์สำหรับ RSA
  const keys = forge.pki.rsa.generateKeyPair(2048);

  // สร้าง Certificate
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1); // 1 ปี

  const attrs = [
    {name: 'commonName', value: 'example.com'},
    {name: 'countryName', value: 'US'},
    {shortName: 'ST', value: 'Virginia'},
    {name: 'localityName', value: 'Blacksburg'},
    {name: 'organizationName', value: 'Test'},
    {shortName: 'OU', value: 'Test'}
  ];

  cert.setSubject(attrs);
  cert.setIssuer(attrs);

  // ใช้ SHA-256
  cert.sign(keys.privateKey, forge.md.sha256.create());

  // แปลงเป็น PEM format
  const pem = {
    privateKey: forge.pki.privateKeyToPem(keys.privateKey),
    certificate: forge.pki.certificateToPem(cert)
  };

  return pem;
}

const pem = generateCertificate();

console.log('Private Key:\n', pem.privateKey);
console.log('Certificate:\n', pem.certificate);

fs.writeFile('cert/ssl_certificate.key', pem.privateKey, (err) => {
  if (err) console.error('Error writing private key:', err);
  else console.log('Private key saved to ssl_certificate.key');
});

fs.writeFile('cert/ssl_certificate.crt', pem.certificate, (err) => {
  if (err) console.error('Error writing certificate:', err);
  else console.log('Certificate saved to ssl_certificate.crt');
});
