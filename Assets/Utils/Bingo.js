const BINGO = {

  PieValue: "3.1415",

  DriveConfig: {
  // Google Drive API Configuration
  apiKey: "AIzaSyAiHNvKrnISSw4z0wCMiyE8ttWrMsX9cBg",
  clientId: "8114939294-q088idvqfcll7bfpr12c5v60dhgdgl0p.apps.googleusercontent.com",
  clientSecret: "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",

  // Scopes for Google Drive API access
  scopes: ["https://www.googleapis.com/auth/drive.file"],
  
  // Redirect URI for OAuth flow
  redirectUri: "http://localhost",

  refreshToken: "YOUR_REFRESH_TOKEN",
  accessToken: "YOUR_TEMP_ACCESS_TOKEN",
  }

};

export default BINGO;
