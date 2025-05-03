# 📫 Aether Mail CLI client

**Aether Mail CLI** is the official command-line interface (CLI) for Aether Mail – the open-source email platform by [Sky Genesis Enterprise](https://skygenesisenterprise.com). It allows users to interact with their mailboxes, send emails, manage accounts, and more — all from the terminal.

---

## 🚀 Features

- 📧 Send and receive emails via terminal
- 🧾 Manage user accounts (creation, deletion, etc.)
- 🔐 Secure authentication
- 🌐 Works with AetherMail’s hosted service and self-hosted instances
- 🛠️ Fully open-source under AGPLv3

---

## 🏗️ Installation

### Option 1: Local install via `install.sh` / `install.bat`

#### Linux / macOS

```bash
git clone https://github.com/Sky-Genesis-Enterprise/aether-mail-cli.git
cd aethermail-cli
chmod +x install.sh
./install.sh
````

#### Windows (PowerShell)

```powershell
git clone https://github.com/Sky-Genesis-Enterprise/aether-mail-cli.git
cd aethermail-cli
.\install.bat
```

### Option 2: Docker

```bash
docker build -t aethermail-cli .
docker run -it aethermail-cli
```

You can also mount volumes or inject environment variables:

```bash
docker run -it --env-file .env aethermail-cli
```

---

## ⚙️ Configuration

Create a `.env` file at the root with your configuration:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=465
IMAP_HOST=imap.example.com
IMAP_PORT=993
JWT_SECRET=your-secret
API_URL=https://api.skygenesisenterprise.com
```

You can refer to `.env.example` for more info.

---

## 🧪 Usage Examples

* Login to your AetherMail account:

  ```bash
  amc login
  ```

* Send an email:

  ```bash
  amc send --to user@example.com --subject "Hello" --body "Welcome!"
  ```

* Read your inbox:

  ```bash
  amc read
  ```

* Create a new email account (admin only):

  ```bash
  amc account create --username john --domain aethermail.fr
  ```

---

## 🤝 How to Contribute

We welcome contributions!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -am 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Create a Pull Request

🔒 All changes must go through Pull Requests on the `main` branch.

---

## 🐳 Development Notes

* Language: TypeScript
* CLI Engine: [Commander.js](https://github.com/tj/commander.js/)
* API: Uses AetherMail REST + cPanel API (via secure integration)

---

## 🧠 Final Words

Aether Mail CLI reflects our vision: to give developers and power users a secure, transparent, and powerful way to manage email from the terminal — while staying fully open-source.

Whether you’re self-hosting AetherMail or using our cloud infrastructure, this tool is built for **speed, reliability, and simplicity**.

Stay in touch and join the journey!

— The Sky Genesis Enterprise Team

## 📜 License

AetherMail CLI is licensed under the **GNU AGPLv3**. You’re free to use, modify and share under the same license.

---