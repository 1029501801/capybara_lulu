document.addEventListener('DOMContentLoaded', function() {
    initNewsletterForm();
    initCapyInteract();
    initFindCapyGame();
    initEmojiCarousel();
    initAutoStatusDecay();
});

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    const emailInput = document.getElementById('email-input');
    const messageElement = document.getElementById('form-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            showMessage(messageElement, '🎉 订阅成功！感谢关注噜噜！', 'success');
            emailInput.value = '';
        } else {
            showMessage(messageElement, '❌ 请输入有效的邮箱地址', 'error');
        }
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `form-message show ${type}`;
    
    setTimeout(() => {
        element.classList.remove('show');
    }, 3000);
}

const capyState = {
    mood: 70,
    hunger: 60,
    energy: 80,
    isSleeping: false,
    currentAction: null
};

function initCapyInteract() {
    const capy = document.getElementById('interact-capy');
    if (!capy) return;
    
    const moodBar = document.getElementById('mood-bar');
    const hungerBar = document.getElementById('hunger-bar');
    const energyBar = document.getElementById('energy-bar');
    const emotionElement = document.getElementById('capy-emotion');
    const messageBubble = document.getElementById('message-bubble');
    
    const petBtn = document.getElementById('pet-btn');
    const feedBtn = document.getElementById('feed-btn');
    const playBtn = document.getElementById('play-btn');
    const sleepBtn = document.getElementById('sleep-btn');
    
    const foodItems = document.querySelectorAll('.food');
    
    updateStatusBars();
    
    capy.addEventListener('click', function() {
        if (!capyState.isSleeping) {
            showEmotion('😊');
            updateMood(5);
            showMessage('你好呀！👋');
        } else {
            showMessage('💤 噜噜正在睡觉...');
        }
    });
    
    capy.addEventListener('dblclick', function() {
        if (!capyState.isSleeping) {
            capy.classList.add('happy');
            showEmotion('😍');
            updateMood(10);
            showMessage('好开心呀！❤️');
            
            setTimeout(() => {
                capy.classList.remove('happy');
            }, 500);
        }
    });
    
    if (petBtn) {
        petBtn.addEventListener('click', function() {
            petCapy();
        });
    }
    
    if (feedBtn) {
        feedBtn.addEventListener('click', function() {
            feedCapy('carrot');
        });
    }
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            playWithCapy();
        });
    }
    
    if (sleepBtn) {
        sleepBtn.addEventListener('click', function() {
            toggleSleep();
        });
    }
    
    foodItems.forEach(food => {
        food.addEventListener('click', function() {
            const foodType = this.dataset.food;
            feedCapy(foodType);
        });
    });
    
    function petCapy() {
        if (capyState.isSleeping) {
            showMessage('💤 不要打扰噜噜睡觉哦~');
            return;
        }
        
        capy.style.transform = 'translate(-50%, -50%) scale(1.05)';
        setTimeout(() => {
            capy.style.transform = 'translate(-50%, -50%)';
        }, 200);
        
        showEmotion('🥰');
        updateMood(8);
        showMessage('舒服~ 再摸摸~ ✨');
    }
    
    function feedCapy(foodType) {
        if (capyState.isSleeping) {
            showMessage('💤 噜噜正在睡觉，等它醒来再喂食吧~');
            return;
        }
        
        const foodMessages = {
            grass: ['🌿 好吃的草！谢谢！', '嗯~ 新鲜的青草最棒了！'],
            carrot: ['🥕 胡萝卜！我的最爱！', '咔嚓咔嚓~ 真好吃！'],
            apple: ['🍎 甜甜的苹果！喜欢！', '水果真美味！']
        };
        
        const messages = foodMessages[foodType] || ['谢谢喂食！'];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        capy.classList.add('happy');
        showEmotion('😋');
        updateHunger(-15);
        updateMood(5);
        showMessage(randomMessage);
        
        setTimeout(() => {
            capy.classList.remove('happy');
        }, 500);
    }
    
    function playWithCapy() {
        if (capyState.isSleeping) {
            showMessage('💤 让噜噜睡一会儿吧~');
            return;
        }
        
        if (capyState.energy < 20) {
            showMessage('😫 噜噜太累了，需要休息...');
            return;
        }
        
        const playAnimations = ['bounce', 'wiggle', 'spin'];
        const randomAnimation = playAnimations[Math.floor(Math.random() * playAnimations.length)];
        
        if (randomAnimation === 'bounce') {
            capy.classList.add('happy');
            setTimeout(() => capy.classList.remove('happy'), 500);
        } else if (randomAnimation === 'wiggle') {
            capy.style.transform = 'translate(-50%, -50%) rotate(10deg)';
            setTimeout(() => {
                capy.style.transform = 'translate(-50%, -50%) rotate(-10deg)';
            }, 150);
            setTimeout(() => {
                capy.style.transform = 'translate(-50%, -50%)';
            }, 300);
        }
        
        showEmotion('🎮');
        updateEnergy(10);
        updateMood(10);
        showMessage('🎾 来玩吧！真开心！');
    }
    
    function toggleSleep() {
        capyState.isSleeping = !capyState.isSleeping;
        
        if (capyState.isSleeping) {
            capy.classList.add('sleeping');
            showEmotion('💤');
            showMessage('😴 噜噜睡着了...');
            
            const sleepInterval = setInterval(() => {
                updateEnergy(-5);
                if (!capyState.isSleeping) {
                    clearInterval(sleepInterval);
                }
            }, 2000);
        } else {
            capy.classList.remove('sleeping');
            showEmotion('😌');
            showMessage('☀️ 睡醒啦！精神满满！');
            updateEnergy(30);
        }
    }
    
    function showEmotion(emoji) {
        emotionElement.textContent = emoji;
        emotionElement.classList.add('show');
        
        setTimeout(() => {
            emotionElement.classList.remove('show');
        }, 2000);
    }
    
    function showMessage(text) {
        messageBubble.textContent = text;
        messageBubble.classList.add('show');
        
        setTimeout(() => {
            messageBubble.classList.remove('show');
        }, 2500);
    }
    
    function updateMood(value) {
        capyState.mood = Math.min(100, Math.max(0, capyState.mood + value));
        moodBar.style.width = capyState.mood + '%';
    }
    
    function updateHunger(value) {
        capyState.hunger = Math.min(100, Math.max(0, capyState.hunger + value));
        hungerBar.style.width = capyState.hunger + '%';
    }
    
    function updateEnergy(value) {
        capyState.energy = Math.min(100, Math.max(0, capyState.energy + value));
        energyBar.style.width = capyState.energy + '%';
    }
    
    function updateStatusBars() {
        if (moodBar) moodBar.style.width = capyState.mood + '%';
        if (hungerBar) hungerBar.style.width = capyState.hunger + '%';
        if (energyBar) energyBar.style.width = capyState.energy + '%';
    }
}

function initFindCapyGame() {
    const gameGrid = document.getElementById('game-grid');
    if (!gameGrid) return;
    
    const gameHint = document.getElementById('game-hint');
    const gameScore = document.getElementById('game-score');
    const resetBtn = document.getElementById('reset-game');
    
    let score = 0;
    const gridSize = 16;
    
    function createGame() {
        gameGrid.innerHTML = '';
        const capyPosition = Math.floor(Math.random() * gridSize);
        
        for (let i = 0; i < gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'game-cell';
            cell.dataset.index = i;
            
            if (i === capyPosition) {
                cell.dataset.hasCapy = 'true';
            }
            
            cell.addEventListener('click', function() {
                handleCellClick(this);
            });
            
            gameGrid.appendChild(cell);
        }
    }
    
    function handleCellClick(cell) {
        if (cell.classList.contains('found')) return;
        
        if (cell.dataset.hasCapy === 'true') {
            cell.textContent = '🦫';
            cell.classList.add('found');
            score += 10;
            gameScore.textContent = '得分: ' + score;
            gameHint.textContent = '🎉 找到了！太棒了！';
            
            setTimeout(() => {
                createGame();
                gameHint.textContent = '点击你认为有水豚的位置';
            }, 1500);
        } else {
            cell.textContent = '❌';
            score = Math.max(0, score - 2);
            gameScore.textContent = '得分: ' + score;
            gameHint.textContent = '再试试！加油！';
            
            setTimeout(() => {
                cell.textContent = '';
            }, 500);
        }
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            score = 0;
            gameScore.textContent = '得分: 0';
            gameHint.textContent = '点击你认为有水豚的位置';
            createGame();
        });
    }
    
    createGame();
}

function initEmojiCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-emoji');
    const nextBtn = document.getElementById('next-emoji');
    
    if (!track) return;
    
    const items = track.querySelectorAll('.emoji-item');
    const itemWidth = items[0]?.offsetWidth || 100;
    const gap = 24;
    let currentIndex = 0;
    
    function updateCarousel() {
        const translateX = -currentIndex * (itemWidth + gap);
        track.style.transform = `translateX(${translateX}px)`;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(items.length - 3, currentIndex + 1);
            updateCarousel();
        });
    }
}

function initAutoStatusDecay() {
    setInterval(() => {
        if (!capyState.isSleeping) {
            capyState.hunger = Math.max(0, capyState.hunger - 2);
            capyState.energy = Math.max(0, capyState.energy - 1);
            
            const hungerBar = document.getElementById('hunger-bar');
            const energyBar = document.getElementById('energy-bar');
            
            if (hungerBar) hungerBar.style.width = capyState.hunger + '%';
            if (energyBar) energyBar.style.width = capyState.energy + '%';
            
            if (capyState.hunger < 20) {
                const messageBubble = document.getElementById('message-bubble');
                if (messageBubble && !messageBubble.classList.contains('show')) {
                    messageBubble.textContent = '🍽️ 噜噜饿了...';
                    messageBubble.classList.add('show');
                    setTimeout(() => messageBubble.classList.remove('show'), 2000);
                }
            }
        }
    }, 3000);
}

document.addEventListener('keydown', function(e) {
    const capy = document.getElementById('interact-capy');
    if (!capy || capyState.isSleeping) return;
    
    switch(e.key) {
        case 'p':
        case 'P':
            const petBtn = document.getElementById('pet-btn');
            petBtn?.click();
            break;
        case 'f':
        case 'F':
            const feedBtn = document.getElementById('feed-btn');
            feedBtn?.click();
            break;
        case 'g':
        case 'G':
            const playBtn = document.getElementById('play-btn');
            playBtn?.click();
            break;
        case 's':
        case 'S':
            const sleepBtn = document.getElementById('sleep-btn');
            sleepBtn?.click();
            break;
    }
});