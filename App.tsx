import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';

export default function App() {
  const [agua, setAgua] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const STEP = 250;
  const META = 2000;

  function adicionarAgua() {
    setAgua((prev) => prev + STEP);
  }

  function removerAgua() {
    setAgua((prev) => (prev >= STEP ? prev - STEP : prev));
  }

  function resetar() {
    setAgua(0);
  }

  function toggleTema() {
    setDarkMode((prev) => !prev);
  }

  const aguaEmLitros = (agua / 1000).toFixed(2);
  const atingiuMeta = agua >= META;
  const progresso = Math.min(agua / META, 1);

  return (
    <ImageBackground
      source={
        darkMode
          ? require('./assets/messi-escuro.jpg')
          : require('./assets/messi-claro.jpg')
      }
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

      <View style={darkMode ? styles.overlayDark : styles.overlayLight}>

        {/* 🖼️ ÍCONE DO APP */}
        <Image
          source={require('./assets/images.jpg')}
          style={styles.icone}
        />

        <Text style={styles.titulo}>💧 Hidratação</Text>

        <Text style={styles.subtitulo}>
          Meta diária: 2.0L
        </Text>

        {/* CARD */}
        <View style={[
          styles.card,
          atingiuMeta ? styles.cardMeta : styles.cardNormal
        ]}>
          <Text style={styles.valor}>{aguaEmLitros} L</Text>
          <Text style={styles.cardText}>
            {atingiuMeta ? '🎉 Meta atingida!' : 'Continue bebendo água'}
          </Text>

          <View style={styles.barraFundo}>
            <View
              style={[
                styles.barraProgresso,
                { width: `${progresso * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* BOTÕES */}
        <TouchableOpacity style={[styles.botao, styles.azul1]} onPress={adicionarAgua}>
          <Text style={styles.textoBotao}>+ 250ml</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.azul2]} onPress={removerAgua}>
          <Text style={styles.textoBotao}>- 250ml</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoReset} onPress={resetar}>
          <Text style={styles.textoBotao}>🔄 Resetar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoTema} onPress={toggleTema}>
          <Text style={styles.textoBotao}>
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  overlayLight: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  overlayDark: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  /* 🖼️ ÍCONE */
  icone: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },

  titulo: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
  },

  subtitulo: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff',
    opacity: 0.85,
  },

  card: {
    width: '92%',
    paddingVertical: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  cardNormal: {
    backgroundColor: '#2E86DE',
  },

  cardMeta: {
    backgroundColor: '#27AE60',
  },

  valor: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },

  cardText: {
    color: '#fff',
    marginTop: 5,
  },

  barraFundo: {
    width: '80%',
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    marginTop: 15,
  },

  barraProgresso: {
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  botao: {
    width: '92%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 12,
  },

  azul1: {
    backgroundColor: '#1B4F72',
  },

  azul2: {
    backgroundColor: '#2874A6',
  },

  botaoReset: {
    width: '92%',
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 12,
  },

  botaoTema: {
    width: '92%',
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});