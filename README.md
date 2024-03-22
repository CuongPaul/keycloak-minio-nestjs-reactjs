# Keycloak - Minio - NestJS - ReactJS

## Requirement

- Docker
- Docker Compose

## Setup

### 1. Keycloak

- Sign in to [Administration Console](http://localhost:8080)
  - Username: **_admin_**
  - Password: **_Pa55w0rd_**

- [Create realm](http://localhost:8080/admin/master/console/#/master/add-realm)

- Create client
  1. nest-demo
      - **Clients** -> **Settings** -> **General settings**
        - Client ID: **nest-demo**
      - **Clients** -> **Settings** -> **Capability config**
        - Client authentication: **On**
      - **Clients** -> **Roles** -> **Create role** -> **Role name** -> **_user_** (It is used to assign role in **Users** -> **User details** -> **Role mapping**)
      - **Clients** -> **Roles** -> **Create role** -> **Role name** -> **_admin_** (It is used to assign role in **Users** -> **User details** -> **Role mapping**)
  2. react-demo
      - **Clients** -> **Settings** -> **General settings**
        - Client ID: **react-demo**
      - **Clients** -> **Settings** -> **Access settings**
        - Home URL: **_http://localhost:3001/_**
        - Valid redirect URIs: **_http://localhost:3001/*_**
        - Valid post logout redirect URIs: **_http://localhost:3001/*_**
        - Web origin: **_http://localhost:3001_**

- Config client scopes
  - **Client scopes** -> **profile** -> **Mappers** -> **Add mappers** -> **By configuration** -> **User Attribute**
    - Name: **_avatar_**
    - User Attribute: **_avatar_**
    - Token Claim Name: **_avatar_**

- Config realm
  - **Realm settings** -> **User profile** -> **Create attribute**
    - Attribute [Name]: **avatar**
    - Display name: **${Avatar}**
    - Permission:
      - Who can edit?: **User** - **Admin**
      - Who can view?: **User** - **Admin**
  - **Realm settings** -> **Login** -> **Login screen customization**
    - User registration: **On**
    - Forgot password: **On**
  - **Realm settings** -> **Email** -> **Template**
    - From: **example@gmail.com**
  - **Realm settings** -> **Email** -> **Connection & Authentication**
    - Host: **smtp.gmail.com**
    - Post: **587**
    - Encryption: **Enable StartTLS**
    - Authentication: **Enabled**
    - Username: **example**
    - Password: **pzgp lkpb mgzw imri** (Go to [application password](https://myaccount.google.com/u/1/apppasswords?utm_source=google-account&utm_medium=myaccountsecurity&utm_campaign=tsv-settings&rapt=AEjHL5Plx2bKft72Pe59WiQvx0cqln1Ie44-gwHxFt6186SNJ9JlO-TgS_LuFVj1tg3WMyBPip4C6eyYgmaOYmfIThFHUgTaEsaHdUorT_VugxnnwwqFHgg) then create new application. Make sure that your Google account is enabled 2-step verification)
  - **Realm settings** -> **Themes**
    - Login theme: custom-theme
  - **Realm settings** -> **User registration** -> **Assign role** -> **Filter by clients** -> **nest-demo user**

- Config indentity provides
  - **Identity providers** -> **Social** -> **Google**
    - Client ID: **942261247349-bjl1m8vog418evl4m0dhmvrrguh5jp26.apps.googleusercontent.com** (Obtaining from [Google Cloud Console](https://console.cloud.google.com))
    - Client Secret: **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** (Obtaining from [Google Cloud Console](https://console.cloud.google.com))
    - Set up on [Google Cloud Console](https://console.cloud.google.com)
      - [New project](https://console.cloud.google.com/projectcreate)
      - **APIs & Services** -> **Credentials**
      - **CREATE CREDENTIALS** -> **OAuth client ID**
        - Application type: Web application
        - Authorized JavaScript origins: http://localhost:8080
        - Authorized redirect URIs: http://localhost:8080/realms/realm-demo/broker/google/endpoint

### 2. Minio

- Sign in to [Console](http://localhost:9001/login)
  - Username: **_tacuong_**
  - Password: **_12345678_**

### 3. NestJS

See more in [README](./nestjs/README.md) file

### 4. ReactJS

See more in [README](./reactjs/README.md) file
