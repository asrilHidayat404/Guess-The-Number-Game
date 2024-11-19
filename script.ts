const buttons_level = document.querySelectorAll<HTMLButtonElement>(".difficulties button");

const level_guess = document.querySelector<HTMLSpanElement>("#level_guess")
const start = document.querySelector<HTMLButtonElement>("#submitGuess")
const cheat = document.querySelector<HTMLButtonElement>("#cheat")
const guess_number = document.querySelector<HTMLInputElement>("#guess")
const result = document.querySelector<HTMLParagraphElement>("#feedback")
console.log(result);

type LevelChoosen = {
    key: number,
    value: string
}

let lvl: LevelChoosen;


lvl = { key: 10, value: "1-10" }
let randomNumber = generateRandomNumber(lvl.key)

if (level_guess) {
    level_guess.textContent = lvl.value;
}
buttons_level.forEach(btnLevel => {
    btnLevel.addEventListener("click", (btn: MouseEvent) => {
        const target = btn.target as HTMLButtonElement | null;
        if (target) {
            console.log(target.id);
            lvl = choosen_level(target.id);
            console.log(lvl);

            if (level_guess) {
                level_guess.textContent = lvl.value || "";
            }

            randomNumber = generateRandomNumber(lvl.key); // Perbarui randomNumber sesuai level
            console.log(`Random number baru: ${randomNumber}`);

            if (cheat) {
                cheat.innerHTML = `<i class="fa-solid fa-eye"></i>`; // Reset tombol cheat
            }
        }
    })
})


function choosen_level(level: string): LevelChoosen {
    console.log(level);
    switch (level) {
        case "easy":
            return { key: 10, value: "1-10" }
        case "medium":
            return { key: 50, value: "1-50" }
        case "hard":
            return { key: 100, value: "1-100" }
        case "impossible":
            return { key: 100000000000, value: "1-∞" }
        default:
            return { key: 0, value: "" };
    }
}

function matcher(randomNumber: number, guess_number: number): string {

    if (isNaN(guess_number)) {
        return "Please enter a valid number.";
    }
    if (!guess_number) {
        return "Input element not found.";
    } else if (
        (guess_number + 1 === randomNumber)
        ||
        (guess_number + 2 === randomNumber)
        ||
        (guess_number - 1 === randomNumber)
        ||
        (guess_number - 2 === randomNumber)
    ) {
        return "you get closer";
    }
    const matcher: boolean = randomNumber === guess_number
    if (!matcher) {
        if (lvl.value == "1-∞") {
            const greet: string[] = ["fool", "kids", "os.remove", "Wrong answer, Good bye😊"];
            let greetMessage = ""; // Menyimpan pesan yang akan ditampilkan
            const feedbackElement = result; // Ambil elemen feedback yang ada di HTML
    
            if (feedbackElement) {
                // Bersihkan feedback lama
                feedbackElement.textContent = "";
                let i = 0;
                const int = setInterval(() => {
                    if (i === greet.length) {
                        clearInterval(int); // Hentikan interval setelah selesai
                        feedbackElement.textContent = greetMessage; // Setel pesan akhir setelah interval selesai
                    } else {
                        greetMessage = greet[i++] + " "; // Gabungkan pesan ke dalam satu string
                        feedbackElement.textContent = greetMessage; // Update elemen feedback dengan pesan yang diperbarui

                    }
                }, 1000); // Setiap 1 detik pesan baru muncul
            }
            setTimeout(() => {
                window.close(); // Tindakan untuk menutup jendela setelah 5 detik
            }, 5000);
            // Mengembalikan pesan kosong karena kita menampilkan pesan di UI
            return ""; 
        }
        return "Wrong answer🗿🗿🗿";
    }


    return "✨Congratulations, you guess the right number✨";

}
function startGuessing() {

    const guessValue = Number(guess_number?.value);
    const feedback = matcher(randomNumber, guessValue);

    if (result) {
        result.textContent = feedback;
    }
}

function generateRandomNumber(levelType: number): number {
    return Math.floor(Math.random() * levelType + 1);
}


start?.addEventListener("click", (e: MouseEvent) => {
    startGuessing()
})
cheat?.addEventListener("click", (e: MouseEvent) => {
    cheat.textContent = `${randomNumber}`;
})


