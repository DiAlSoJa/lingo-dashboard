"use client";
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import axios from "axios";
import { useRouter } from 'next/navigation';

interface TableActionsProps {
    id: string;
}

const TableActions: React.FC<TableActionsProps> = ({ id }) => {
    const router = useRouter();
    const onDelete = async () => {
        try {
            await axios.delete(`/api/lists/${id}`);
            toast.success("word_type eliminado con éxito");
            router.refresh();
        } catch (error) {
            toast.error("Hubo un error al eliminar la word_type");
        }
    };

    return (
        <>
            <Link href={`/lists/edit/${id}`}>
                <Button variant={"primary"}>
                    Editar
                </Button>
            </Link>
            <Button variant={"danger"} onClick={onDelete}>
                Eliminar
            </Button>
        </>
    );
};

export default TableActions;