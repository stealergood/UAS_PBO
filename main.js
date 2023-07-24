class DataBuku {
  constructor(judul, pengarang, tahunTerbit, deskripsi, status) {
    this.judul = judul;
    this.pengarang = pengarang;
    this.tahunTerbit = tahunTerbit;
    this.deskripsi = deskripsi;
    this.status = status;
  }
}

class NewUser {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

class Auth extends NewUser {
  constructor(username, password) {
    super(username, password);
    this.user = [];
  }

  login() {
    console.log("=== Masuk ===");
    this.username = prompt("Masukkan username: ");
    this.password = prompt("Masukkan password: ");

    if (this.username === "admin" && this.password === "admin") {
      console.clear();
      menu.AdminMenu();
    } else {
      const foundUser = this.user.find(
        (user) => user.username === this.username && user.password === this.password
      );
      if (foundUser) {
        console.clear();
        menu.UserMenu();
      } else {
        console.clear();
        console.log("Username atau password salah");
        menu.MainMenu();
      }
    }
  }

  register() {
    console.log("=== Daftar Member ===");
    this.username = prompt("Masukkan username: ");
    this.password = prompt("Masukkan password: ");
    const userBaru = new NewUser(this.username, this.password);
    this.user.push(userBaru);
    console.clear();
    console.log("Register berhasil");
    menu.MainMenu();
  }

  logout() {
    console.clear();
    console.log("Logout berhasil");
    menu.MainMenu();
  }
}

let buku = [];
class Admin extends DataBuku {
  constructor(judul, pengarang, tahunTerbit, deskripsi) {
    super(judul, pengarang, tahunTerbit, deskripsi);
  }

  addBuku() {
    console.log("=== Tambah buku ===");
    this.judul = prompt("Masukkan judul buku: ");
    this.pengarang = prompt("Masukkan pengarang buku: ");
    this.tahunTerbit = prompt("Masukkan tahun terbit buku: ");
    this.deskripsi = prompt("Masukkan deskripsi buku: ");
    this.status = "Tersedia";
    const bukuBaru = new DataBuku(
      this.judul,
      this.pengarang,
      this.tahunTerbit,
      this.deskripsi,
      this.status
    );
    buku.push(bukuBaru);
    console.clear();
    console.log("Buku berhasil ditambahkan");
    menu.AdminMenu();
  }

  deleteBuku() {
    console.clear();
    console.log("=== Hapus buku ===");
    buku.forEach((buku, index) => {
      console.log(`${index + 1}. ${buku.judul}`);
    });
    const index = parseInt(
      prompt("Pilih buku yang ingin dihapus (0 untuk kembali): ")
    );

    if (index == 0) {
      console.clear();
      menu.AdminMenu();
    } else if (index > 0 || index <= buku.length) {
      buku.splice(index - 1, 1);
      console.clear();
      console.log("Buku berhasil dihapus");
      menu.AdminMenu();
    } else {
      console.clear();
      console.log("Pilihan tidak tersedia");
      this.deleteBuku();
    }
  }

  editBuku() {
    console.log("=== Edit buku ===");
    buku.forEach((buku, index) => {
      console.log(`${index + 1}. ${buku.judul}`);
    });

    const index = parseInt(
      prompt("Pilih buku yang ingin diedit (0 untuk kembali): ")
    );

    if (index == 0) {
      console.clear();
      menu.AdminMenu();
    } else if (index > 0 || index <= buku.length) {
      console.clear();
      console.log(`=== ${buku[index - 1].judul} ===`);
      console.log("1. Edit Judul");
      console.log("2. Edit Pengarang");
      console.log("3. Edit Tahun Terbit");
      console.log("4. Edit Deskripsi");
      const pilihan = prompt(">>> ");
      const selectedBook = buku[index - 1];

      switch (pilihan) {
        case "1":
          const judul = prompt("Masukkan judul buku: ");
          selectedBook.judul = judul;
          console.clear();
          console.log("Buku berhasil diedit");
          break;

        case "2":
          const pengarang = prompt("Masukkan pengarang buku: ");
          selectedBook.pengarang = pengarang;
          console.clear();
          console.log("Buku berhasil diedit");
          break;

        case "3":
          const tahunTerbit = prompt("Masukkan tahun terbit buku: ");
          selectedBook.tahunTerbit = tahunTerbit;
          console.clear();
          console.log("Buku berhasil diedit");
          break;

        case "4":
          const deskripsi = prompt("Masukkan deskripsi buku: ");
          selectedBook.deskripsi = deskripsi;
          console.clear();
          console.log("Buku berhasil diedit");
          break;

        default:
          console.clear();
          console.log("Pilihan tidak tersedia");
          break;
      }
      this.editBuku();
    } else {
      console.clear();
      console.log("Pilihan tidak tersedia");
      this.editBuku();
    }
  }

  listLengkap(pilihan) {
    console.log(`=== ${buku[pilihan].judul} ===`);
    console.log(`Pengarang: ${buku[pilihan].pengarang}`);
    console.log(`Tahun Terbit: ${buku[pilihan].tahunTerbit}`);
    console.log(`Deskripsi: ${buku[pilihan].deskripsi}`);
    const back = prompt("0 untuk kembali>>> ");
    switch (back) {
      case "0":
        console.clear();
        menu.AdminMenu();
        break;
      default:
        console.log("Pilihan tidak tersedia");
        this.listLengkap(pilihan);
    }
  }

  listBuku() {
    console.log("=== Daftar Buku ===");
    if (buku.length === 0) {
      console.log("Buku kosong");
    }
    buku.forEach((buku, index) => {
      console.log(`${index + 1}. ${buku.judul}`);
    });

    const pilihan = parseInt(
      prompt("pilih untuk melihat deskripsi buku atau 0 untuk kembali>>> ")
    );
    if (pilihan == 0) {
      console.clear();
      menu.AdminMenu();
    } else if (pilihan > 0 && pilihan <= buku.length) {
      console.clear();
      this.listLengkap(pilihan - 1);
    } else {
      console.log("Pilihan tidak tersedia");
    }
  }

  statusBuku() {
    console.log("=== Status Buku ===");
    if (buku.length === 0) {
      console.log("Buku kosong");
    } else {
      buku.forEach((buku, index) => {
        console.log(`${index + 1}. ${buku.judul} - ${buku.status}`);
      });
    }

    const back = prompt("0 untuk kembali>>> ");
    switch (back) {
      case "0":
        console.clear();
        menu.AdminMenu();
        break;
      default:
        console.log("Pilihan tidak tersedia");
        this.statusBuku();
    }
  }
}

let bukuDipinjam = [];
class User extends NewUser {
  constructor(username, password) {
    super(username, password);
  }

  listLengkap(pilihan) {
    console.log(`=== ${buku[pilihan].judul} ===`);
    console.log(`Pengarang: ${buku[pilihan].pengarang}`);
    console.log(`Tahun Terbit: ${buku[pilihan].tahunTerbit}`);
    console.log(`Deskripsi: ${buku[pilihan].deskripsi}`);
    const back = prompt("0 untuk kembali>>> ");
    switch (back) {
      case "0":
        console.clear();
        menu.UserMenu();
        break;
      default:
        console.log("Pilihan tidak tersedia");
        this.listLengkap(pilihan);
    }
  }

  listBuku() {
    console.log("=== Daftar Buku ===");
    if (buku.length === 0) {
      console.log("Buku kosong");
    }
    buku.forEach((buku, index) => {
      console.log(`${index + 1}. ${buku.judul}`);
    });

    const pilihan = parseInt(
      prompt("pilih untuk melihat deskripsi buku atau 0 untuk kembali>>> ")
    );
    if (pilihan == 0) {
      console.clear();
      menu.UserMenu();
    } else if (pilihan > 0 && pilihan <= buku.length) {
      console.clear();
      this.listLengkap(pilihan - 1);
    } else {
      console.log("Pilihan tidak tersedia");
    }
  }

  pinjamBuku() {
    console.log("=== Pinjam Buku ===");
    if (buku.length === 0) {
      console.log("Buku kosong");
    }
    buku.forEach((buku, index) => {
      console.log(`${index + 1}. ${buku.judul}`);
    });

    const pilihan = parseInt(
      prompt("pilih untuk meminjam buku atau 0 untuk kembali>>> ")
    );
    if (pilihan == 0) {
      console.clear();
      menu.UserMenu();
    } else if (pilihan > 0 && pilihan <= buku.length) {
      console.clear();
      if (buku[pilihan - 1].status === "Tersedia") {
        buku[pilihan - 1].status = "Dipinjam";
        bukuDipinjam.push(buku[pilihan - 1]);
        console.log("Buku berhasil dipinjam");
        this.pinjamBuku();
      } else {
        console.log("Buku sedang dipinjam");
        this.pinjamBuku();
      }
    } else {
      console.clear();
      console.log("Pilihan tidak tersedia");
      this.pinjamBuku();
    }
  }

  kembalikanBuku() {
    console.log("=== Kembalikan Buku ===");
    if (bukuDipinjam.length === 0) {
      console.log("Buku kosong");
    }
    bukuDipinjam.forEach((buku, index) => {
      console.log(`${index + 1}. ${buku.judul}`);
    });

    const pilihan = parseInt(
      prompt("pilih untuk mengembalikan buku atau 0 untuk kembali>>> ")
    );
    if (pilihan == 0) {
      console.clear();
      menu.UserMenu();
    } else if (pilihan > 0 && pilihan <= bukuDipinjam.length) {
      console.clear();
      bukuDipinjam[pilihan - 1].status = "Tersedia";
      console.log("Buku berhasil dikembalikan");
      menu.UserMenu();
    } else {
      console.clear();
      console.log("Pilihan tidak tersedia");
      this.kembalikanBuku();
    }
  }
}

class Menu {
  MainMenu() {
    console.log("=== Selamat datang di perpustakaan ===");
    console.log("1. Masuk");
    console.log("2. Registrasi");
    console.log("3. Exit");
    const pilihan = prompt(">>> ");

    switch (pilihan) {
      case "1":
        console.clear();
        auth.login();
        break;
      case "2":
        console.clear();
        auth.register();
        break;
      case "3":
        process.exit(0);
      default:
        console.clear();
        console.log("Pilihan tidak tersedia");
        this.MainMenu();
    }
  }

  AdminMenu() {
    console.log("=== Menu Admin ===");
    console.log("1. Tambah buku");
    console.log("2. Lihat buku");
    console.log("3. Hapus buku");
    console.log("4. Edit buku");
    console.log("5. Status Buku");
    console.log("6. Logout");
    console.log("7. Exit");
    const pilihan = prompt(">>> ");
    switch (pilihan) {
      case "1":
        console.clear();
        admin.addBuku();
        break;
      case "2":
        console.clear();
        admin.listBuku();
        break;
      case "3":
        console.clear();
        admin.deleteBuku();
        break;
      case "4":
        console.clear();
        admin.editBuku();
        break;
      case "5":
        console.clear();
        admin.statusBuku();
        break;
      case "6":
        console.clear();
        auth.logout();
      case "7":
        console.clear();
        process.exit(0);
      default:
        console.clear();
        console.log("Pilihan tidak tersedia");
        this.AdminMenu();
    }
  }

  UserMenu() {
    console.log("=== Menu User ===");
    console.log("1. Lihat buku");
    console.log("2. Pinjam buku");
    console.log("3. Kembalikan buku");
    console.log("4. Logout");
    const pilihan = prompt(">>> ");
    switch (pilihan) {
      case "1":
        console.clear();
        users.listBuku();
        break;
      case "2":
        console.clear();
        users.pinjamBuku();
        break;
      case "3":
        console.clear();
        users.kembalikanBuku();
        break;
      case "4":
        console.clear();
        auth.logout();
        break;
      default:
        console.clear();
        console.log("Pilihan tidak tersedia");
        this.UserMenu();
    }
  }
}

const prompt = require("prompt-sync")();
const menu = new Menu();
const admin = new Admin();
const auth = new Auth();
const users = new User();
menu.MainMenu();