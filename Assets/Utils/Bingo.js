const BINGO = {
  PieValue: "3.1415",

  DriveConfig: {
    // Google Drive API Configuration
    apiKey: "AIzaSyAiHNvKrnISSw4z0wCMiyE8ttWrMsX9cBg",
    clientId: "8114939294-q088idvqfcll7bfpr12c5v60dhgdgl0p.apps.googleusercontent.com",
    clientSecret: "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",
    scopes: ["https://www.googleapis.com/auth/drive.file"],
    redirectUri: "http://localhost",
    refreshToken: "YOUR_REFRESH_TOKEN",
    accessToken: "YOUR_TEMP_ACCESS_TOKEN",
  },

  // ✅ Google Sheets Web App URL
  SheetConfig: {
    url: "https://script.google.com/macros/s/AKfycbw5Symtsxwuol2yZPCZ6gR7xOuSjnRREtyJ1vB1bA5mIypHCZB8Pa_aZNe1j3Ay12E/exec"
  },

  // ✅ WhatsApp Number (country code + number, no + sign)
  WhatsAppNumber: "918459481200"
};

export default BINGO;
