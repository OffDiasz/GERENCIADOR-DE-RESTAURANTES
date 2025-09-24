'use client';

import { useState } from 'react';
import { Restaurant } from '@/types/restaurants'; // Corrigido para o singular
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SimpleRestaurantFormProps {
  initialData?: Restaurant | null;
  onSubmit: (data: Omit<Restaurant, 'id' | 'createdAt'>) => void;
}

export default function RestaurantForm({
  initialData,
  onSubmit,
}: SimpleRestaurantFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [cuisine, setCuisine] = useState(initialData?.cuisine || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [open, setOpen] = useState<boolean>(initialData?.open || true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!name || !cuisine || !city) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const data = {
      name,
      cuisine,
      city,
      rating: Number(rating),
      open,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cuisine">Cozinha</Label>
        <Input
          id="cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">Cidade</Label>
        <Input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rating">Avaliação (0-5)</Label>
        <Input
          id="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
          min="0"
          max="5"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="open"
          checked={open}
          onCheckedChange={(checked) => setOpen(!!checked)} // Correção aqui
        />
        <Label htmlFor="open">Aberto agora?</Label>
      </div>
      <Button type="submit">Salvar</Button>
    </form>
  );
}
