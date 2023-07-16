import React from 'react';
import { cartActions } from '@/store/slices/cart.slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusIcon, PlusIcon, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';

interface CartCounterProps {
  id: number;
  size: string;
  quantity: number;
}

const CartCounter: React.FC<CartCounterProps> = ({
  id,
  size,
  quantity
}) => {
  const dispatch = useDispatch();

  const onChange = (newValue: number) => {
    dispatch(
      cartActions.updateQuantity({ id, size, quantity: newValue })
    );
  };

  const onMinus = () => onChange(quantity - 1);
  const onPlus = () => onChange(quantity + 1);
  const onRemove = () =>
    dispatch(cartActions.removeItem({ id, size }));

  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={onMinus}>
        <MinusIcon className="w-3 h-3" />
      </Button>
      <Input disabled value={quantity} className="h-8 w-14" />
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={onPlus}>
        <PlusIcon className="w-3 h-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={onRemove}>
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default CartCounter;
