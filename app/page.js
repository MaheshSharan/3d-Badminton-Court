import Head from 'next/head';
import Scene from '../components/Scene';

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Head>
        <title>3D Badminton Court</title>
        <meta name="description" content="3D Badminton Court Web Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Scene />
    </div>
  );
}