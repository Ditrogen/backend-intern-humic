

# E-Commerce API Documentation

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

## Introduction
Project intern HUMIC Batch 4 Website Penerimaan Magang


**Framework:** [Express.js](https://expressjs.com/)  
**Database:** MySQL


## Contributing
**Team Humic Intern Batch 4**
|**Nama**| **Role** |  
|:-------|:-----------:|
|REINHARD EFRAIM SITUMEANG |UI/UX WEBSITE|
|SHAFA SALMA PERMANA|UI/UX MOBILE|
|MUHAMMAD FARIED GUNAWAN|FRONT END DEVELOPER|
|YOHANES JANUARICO ANDIAWAN|BACK END DEVELOPER |
|REIHAN RAMADHANA ANWARI |BACK END DEVELOPER |
|DELKANO MARZUKI BERUTU|MOBILE DEVELOPER |


---

## Database Structure (outdated)

![Entity Relationship Diagram](https://raw.githubusercontent.com/Ditrogen/backend-intern-humic/main/src/docs/ERD.png)
The database consists of the following tables:

1. **mahasiswa**: Menyimpan data lengkap mahasiswa yang mendaftar magang..
2. **admin**: Digunakan untuk login dan mengelola lowongan.
3. **lowongan_magang**: Informasi detail tentang posisi magang yang tersedia.
4. **lamaran_magang**: Data lamaran yang diajukan mahasiswa.
5. **hasil_research**: Menyimpan hasil riset proyek dari mahasiswa atau tim.
6. **partnership**: Data partner/institusi yang bekerja sama.
---

## Instalasi
### Clone Repository
```
git clone https://github.com/Ditrogen/backend-intern-humic.git
```
Jangan lupa untuk masuk ke direktori projectnya.
```
cd backend-intern-humic
```
### Install Dependencies
```
npm install
```
### Running the Backend
Mohon perhatian penggunaan 'starts' memakai huruf 's'.
Kata 'start' digunakan untuk development.
```
npm starts
```
### Testing the API
Untuk melihat seluruh endpointnya, gunakan /api-docs, pastika NODE_ENV bukan production dan SWAGGER_ENABLED bernilai true

---
## License
This API is licensed under the [MIT License](https://opensource.org/licenses/MIT).
