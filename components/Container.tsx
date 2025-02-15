import { SafeAreaView, StatusBar } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className={styles.container}>
    <StatusBar barStyle="dark-content" />
    {children}
  </SafeAreaView>;
};

const styles = {
  container: 'flex flex-1 p-6',
};
