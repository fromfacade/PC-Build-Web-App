import { Request, Response } from 'express';
import { partService } from '../services/partService';

export const partController = {
    async getParts(req: Request, res: Response) {
        try {
            const q = req.query.q as string;
            const parts = await partService.getParts(q);
            res.json(parts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch parts' });
        }
    },

    async getPartById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid ID' });
            }
            const part = await partService.getPartById(id);
            if (!part) {
                return res.status(404).json({ error: 'Part not found' });
            }
            res.json(part);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch part' });
        }
    },

    async createPart(req: Request, res: Response) {
        try {
            const part = await partService.createPart(req.body);
            res.status(201).json(part);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create part' });
        }
    },
};
