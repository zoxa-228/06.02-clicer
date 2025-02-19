import React, { useState, useEffect } from 'react';

function ClickerGame() {
  const [coins, setCoins] = useState(0);  // Количество монет
  const [clickPower, setClickPower] = useState(1);  // Мощность клика
  const [autoMining, setAutoMining] = useState(0);  // Автодобыча
  const [autoMiningInterval, setAutoMiningInterval] = useState(null);  // Интервал автодобычи
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);  // Показ диалога улучшений
  const [upgradeCosts, setUpgradeCosts] = useState({
    clickPower: 10,
    autoMining: 20,
    environment: 100
  });  // Стоимость улучшений
  const [environment, setEnvironment] = useState([]);  // Изображения окружения

  // Автодобыча монет каждую секунду
  useEffect(() => {
    // Если нет активного интервала, создаем новый
    if (autoMining > 0 && autoMiningInterval === null) {
      const interval = setInterval(() => {
        setCoins(prevCoins => prevCoins + autoMining);
      }, 1000);  // обновление каждую секунду

      setAutoMiningInterval(interval); // Сохраняем интервал

      return () => clearInterval(interval);  // Очистка интервала при размонтировании компонента
    }

    // Если автодобыча = 0, останавливаем интервал
    if (autoMining === 0 && autoMiningInterval !== null) {
      clearInterval(autoMiningInterval);
      setAutoMiningInterval(null);
    }
  }, [autoMining, autoMiningInterval]);

  // Функция для добычи монеты при клике
  const handleMineClick = () => {
    setCoins(prevCoins => prevCoins + clickPower);
  };

  // Функции для улучшений
  const upgradeClickPower = () => {
    if (coins >= upgradeCosts.clickPower) {
      setCoins(prevCoins => prevCoins - upgradeCosts.clickPower);
      setClickPower(prevClickPower => prevClickPower + 1);
      setUpgradeCosts(prevCosts => ({
        ...prevCosts,
        clickPower: Math.round(prevCosts.clickPower * 1.5)
      }));
    }
  };

  const upgradeAutoMining = () => {
    if (coins >= upgradeCosts.autoMining) {
      setCoins(prevCoins => prevCoins - upgradeCosts.autoMining);
      setAutoMining(prevAutoMining => prevAutoMining + 2); // Увеличиваем автодобычу на 2 монеты в секунду
      setUpgradeCosts(prevCosts => ({
        ...prevCosts,
        autoMining: Math.round(prevCosts.autoMining * 1.5)
      }));
    }
  };

  const upgradeEnvironment = () => {
    if (coins >= upgradeCosts.environment) {
      setCoins(prevCoins => prevCoins - upgradeCosts.environment);
      setEnvironment(prevEnv => [...prevEnv, 'environment-element']); // Добавление нового элемента окружения
      setUpgradeCosts(prevCosts => ({
        ...prevCosts,
        environment: Math.round(prevCosts.environment * 1.5)
      }));
    }
  };

  const handleCloseDialog = () => {
    setShowUpgradeDialog(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Кликер с улучшениями</h1>
      
      <div style={styles.stats}>
        <p>Монеты: {coins}</p>
        <p>Автодобыча: {autoMining} монет/с</p>
        <button onClick={() => setShowUpgradeDialog(true)} style={styles.upgradeButton}>
          Улучшения
        </button>
      </div>

      <button onClick={handleMineClick} style={styles.mineButton}>
        Добыть
      </button>

      {showUpgradeDialog && (
        <div style={styles.dialog}>
          <div style={styles.dialogContent}>
            <h2>Улучшения</h2>
            <button onClick={upgradeClickPower} style={styles.upgradeBtn}>Улучшить клик (+1): {upgradeCosts.clickPower} монет</button>
            <button onClick={upgradeAutoMining} style={styles.upgradeBtn}>Улучшить автодобычу (+2/с): {upgradeCosts.autoMining} монет</button>
            <button onClick={upgradeEnvironment} style={styles.upgradeBtn}>Улучшить окружение: {upgradeCosts.environment} монет</button>
            <button onClick={handleCloseDialog} style={styles.closeButton}>Закрыть</button>
          </div>
        </div>
      )}

      <div style={styles.environment}>
        {environment.map((item, index) => (
          <img key={index} src={`./assets/${item}.png`} alt="environment" style={styles.environmentItem} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    margin: 'auto',
  },
  title: {
    fontSize: '36px',
    color: '#333',
  },
  stats: {
    marginBottom: '20px',
  },
  upgradeButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
  mineButton: {
    padding: '20px',
    fontSize: '20px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '8px',
    width: '200px',
    backgroundColor: '#2196F3',
    color: 'white',
    marginTop: '40px',
  },
  dialog: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    textAlign: 'center',
  },
  upgradeBtn: {
    padding: '10px 20px',
    margin: '10px 0',
    fontSize: '16px',
    backgroundColor: '#FFC107',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  closeButton: {
    padding: '10px 20px',
    marginTop: '20px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  environment: {
    marginTop: '40px',
  },
  environmentItem: {
    width: '100px',
    height: '100px',
    margin: '10px',
    display: 'inline-block',
  }
};

export default ClickerGame;