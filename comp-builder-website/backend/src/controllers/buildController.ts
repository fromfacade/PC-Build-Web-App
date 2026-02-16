import { Request, Response } from 'express';
import { buildService } from '../services/buildService';

export const buildController = {
    async getBuildById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid ID' });
            }
            const build = await buildService.getBuildById(id);
            if (!build) {
                return res.status(404).json({ error: 'Build not found' });
            }
            res.json(build);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch build' });
        }
    },

    async createBuild(req: Request, res: Response) {
        try {
            const { name, components } = req.body;
            if (!name || !components) {
                return res.status(400).json({ error: 'Missing name or components' });
            }

            const build = await buildService.createBuild({ name, components });
            res.status(201).json(build);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create build' });
        }
    },
};
