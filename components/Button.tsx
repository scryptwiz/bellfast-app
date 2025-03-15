import { forwardRef, ReactNode } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View, Image, ImageSourcePropType, StyleSheet } from 'react-native';

type ButtonVariant = 'fill' | 'outline';
type ButtonProps = {
  title: string;
  isLoading?: boolean;
  variant?: ButtonVariant;
  icon?: ImageSourcePropType;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, isLoading = false, variant = 'fill', icon, ...touchableProps }, ref) => {
  const baseClasses = 'rounded-2xl p-4 flex flex-row items-center justify-center gap-5';
  const fillClasses = 'bg-p2';
  const outlineClasses = 'border border-p2';

  const buttonClasses = `${baseClasses} ${variant === 'fill' ? fillClasses : outlineClasses} ${isLoading ? 'bg-p2/80' : ''} ${touchableProps.className}`;

  return (
    <TouchableOpacity
      ref={ref}
      {...touchableProps}
      className={buttonClasses}
      disabled={isLoading}>
      {icon && <Image source={icon} style={styles.icon} />}
      <View>
        <Text className={`${variant === 'fill' ? 'text-white' : 'text-p2'} text-center text-lg font-bold`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});