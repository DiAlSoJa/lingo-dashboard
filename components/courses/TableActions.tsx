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
            await axios.delete(`/api/courses/${id}`);
            toast.success("Course eliminado con éxito");
            router.refresh();
        } catch (error) {
            toast.error("Hubo un error al eliminar la plant");
        }
    };

    return (
        <>
            <Link href={`/courses/edit/${id}`}>
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