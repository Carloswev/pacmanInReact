import React, { useRef, useEffect, useState } from 'react';
import './GameCanvas.css';

const GameCanvas = () => {
    const canvasRef = useRef(null);
    const [pacmanPos, setPacmanPos] = useState({ x: 200, y: 200 });
    const [score, setScore] = useState(0);
    const [ghosts, setGhosts] = useState([
        { x: 100, y: 100, size: 30 },
        { x: 300, y: 300, size: 30 }
    ]);
    const pacmanSize = 40;
    const pacmanSpeed = 5;
    const ghostSpeed = 2;
    const wallColor = 'blue';
    const foodColor = 'orange';
    const ghostColor = 'red';
    
    // Labirinto e alimentos
    const walls = [ /* ... (mesmo código) ... */ ];
    const foods = [ /* ... (mesmo código) ... */ ];

    const detectCollision = (x, y) => { /* ... (mesmo código) ... */ };
    const checkFoodCollision = (x, y) => { /* ... (mesmo código) ... */ };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawPacman = () => {
            ctx.beginPath();
            ctx.arc(pacmanPos.x + pacmanSize / 2, pacmanPos.y + pacmanSize / 2, pacmanSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);
            ctx.lineTo(pacmanPos.x + pacmanSize / 2, pacmanPos.y + pacmanSize / 2);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        };

        const drawWalls = () => {
            walls.forEach(wall => {
                ctx.fillStyle = wallColor;
                ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
            });
        };

        const drawFoods = () => {
            foods.forEach(food => {
                ctx.fillStyle = foodColor;
                ctx.fillRect(food.x, food.y, food.width, food.height);
            });
        };

        const drawGhosts = () => {
            ghosts.forEach(ghost => {
                ctx.beginPath();
                ctx.arc(ghost.x + ghost.size / 2, ghost.y + ghost.size / 2, ghost.size / 2, 0, 2 * Math.PI);
                ctx.fillStyle = ghostColor;
                ctx.fill();
                ctx.closePath();
            });
        };

        const updateCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawWalls();
            drawFoods();
            drawGhosts();
            drawPacman();
        };

        updateCanvas();
    }, [pacmanPos, foods, score, ghosts]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            setPacmanPos(prevPos => {
                let newPos = { ...prevPos };
                switch (event.key) {
                    case 'ArrowUp':
                        newPos.y -= pacmanSpeed;
                        break;
                    case 'ArrowDown':
                        newPos.y += pacmanSpeed;
                        break;
                    case 'ArrowLeft':
                        newPos.x -= pacmanSpeed;
                        break;
                    case 'ArrowRight':
                        newPos.x += pacmanSpeed;
                        break;
                    default:
                        break;
                }
                if (!detectCollision(newPos.x, newPos.y) && !checkFoodCollision(newPos.x, newPos.y)) {
                    return newPos;
                }
                return prevPos;
            });
        };

        const moveGhosts = () => {
            setGhosts(prevGhosts => {
                return prevGhosts.map(ghost => {
                    let newX = ghost.x;
                    let newY = ghost.y;
                    if (pacmanPos.x < ghost.x) newX -= ghostSpeed;
                    if (pacmanPos.x > ghost.x) newX += ghostSpeed;
                    if (pacmanPos.y < ghost.y) newY -= ghostSpeed;
                    if (pacmanPos.y > ghost.y) newY += ghostSpeed;

                    return { ...ghost, x: newX, y: newY };
                });
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        const interval = setInterval(moveGhosts, 100);  // Move ghosts every 100ms
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, [pacmanPos]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="game-canvas"
            />
            <div className="score">Pontuação: {score}</div>
        </div>
    );
};

export default GameCanvas;
