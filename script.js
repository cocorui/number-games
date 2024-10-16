const gridElement = document.getElementById('grid');
const messageElement = document.getElementById('message');
const emojiElement = document.getElementById('emoji');
const emojiCollectionElement = document.getElementById('emoji-collection');

const emojis = [
    { name: "白色小兔", src: "images/white-rabbit.png" },
    { name: "白色小猫", src: "images/white-cat.png" },
    { name: "白色小狗", src: "images/white-dog.png" },
    { name: "白色幽灵", src: "images/white-ghost.png" }
];

let collectedEmojis = []; // 收集的表情包
let levels = []; // 关卡数组
let currentLevel = 0; // 当前关卡
let completedLevels = 0; // 完成的关卡数

function generateLevels() {
    for (let i = 0; i < 100; i++) {
        const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * (i + 1) + 1));
        const target = numbers.reduce((sum, num) => sum + num, 0);
        levels.push({ numbers, target });
    }
}

function generateLevel() {
    gridElement.innerHTML = ""; // 清空当前网格
    const level = levels[currentLevel];
    level.numbers.forEach(num => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerText = num; // 使用定义的数字
        cell.onclick = function() {
            this.classList.toggle('selected');
        };
        gridElement.appendChild(cell);
    });
}

document.getElementById('check-button').onclick = function() {
    const selectedCells = document.querySelectorAll('.selected');
    const sum = Array.from(selectedCells).reduce((acc, cell) => acc + parseInt(cell.innerText), 0);
    const target = levels[currentLevel].target;

    if (sum === target) {
        messageElement.innerText = "成功！";
        completedLevels++;
        if (completedLevels % 5 === 0) {
            // 随机选择一个表情包
            const randomIndex = Math.floor(Math.random() * emojis.length);
            const emoji = emojis[randomIndex];
            collectedEmojis.push(emoji);
            displayCollectedEmojis();
            emojiElement.innerText = "🎉"; // 显示奖励
        }
        currentLevel++;
        if (currentLevel < levels.length) {
            generateLevel();
        } else {
            messageElement.innerText = "恭喜你完成所有关卡！";
        }
    } else {
        messageElement.innerText = "失败，再试一次！";
    }
};

function displayCollectedEmojis() {
    emojiCollectionElement.innerHTML = ""; // 清空当前展示
    collectedEmojis.forEach(emoji => {
        const img = document.createElement('img');
        img.src = emoji.src;
        img.alt = emoji.name;
        img.title = emoji.name;
        emojiCollectionElement.appendChild(img);
    });
}

// 初始化
generateLevels();
generateLevel();
