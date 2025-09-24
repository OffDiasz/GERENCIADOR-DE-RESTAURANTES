'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getRestaurants, saveRestaurants } from '@/lib/restaurants';
import { Restaurant } from '@/types/restaurants'; // Corrigido para o singular
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import Link from 'next/link';
import SimpleRestaurantForm from '@/components/ui/RestaurantForm'; // Corrigido o caminho e o nome

export default function DashboardPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    [],
  );
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null,
  );

  useEffect(() => {
    const data = getRestaurants();
    setRestaurants(data);
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredRestaurants(filtered);
  }, [restaurants, search]);

  // A função agora aceita o tipo de dado correto que vem do formulário
  const addOrUpdateRestaurant = (data: Omit<Restaurant, 'id' | 'createdAt'>) => {
    let updatedRestaurants;

    if (editingRestaurant) {
      updatedRestaurants = restaurants.map((r) =>
        r.id === editingRestaurant.id
          ? { ...data, id: editingRestaurant.id, createdAt: editingRestaurant.createdAt }
          : r,
      );
    } else {
      updatedRestaurants = [
        ...restaurants,
        { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() },
      ];
    }
    
    setRestaurants(updatedRestaurants);
    saveRestaurants(updatedRestaurants);
    setIsDialogOpen(false);
    toast.success('Restaurante salvo com sucesso!');
  };

  const deleteRestaurant = (id: string) => {
    const updatedRestaurants = restaurants.filter((r) => r.id !== id);
    setRestaurants(updatedRestaurants);
    saveRestaurants(updatedRestaurants);
    toast.success('Restaurante removido.');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Restaurantes</h1>
        <div className="flex gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingRestaurant(null)}>
                Adicionar Restaurante
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingRestaurant ? 'Editar' : 'Adicionar'} Restaurante
                </DialogTitle>
              </DialogHeader>
              <SimpleRestaurantForm
                initialData={editingRestaurant}
                onSubmit={addOrUpdateRestaurant}
              />
            </DialogContent>
          </Dialog>
          <Link href="/logout">
            <Button variant="outline">Sair</Button>
          </Link>
        </div>
      </div>
      <Input
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Cozinha</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Aberto</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRestaurants.map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell>{restaurant.name}</TableCell>
              <TableCell>{restaurant.cuisine}</TableCell>
              <TableCell>{restaurant.city}</TableCell>
              <TableCell>{restaurant.rating}</TableCell>
              <TableCell>{restaurant.open ? 'Sim' : 'Não'}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingRestaurant(restaurant);
                    setIsDialogOpen(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteRestaurant(restaurant.id)}
                  className="ml-2"
                >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}