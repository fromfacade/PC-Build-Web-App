export const PARTS_DATA = {
  cpu: [
    { id: 'c1', name: 'Intel Core i9-13900K', price: 589, brand: 'Intel', socket: 'LGA1700', image: 'https://placehold.co/100x100?text=i9' },
    { id: 'c2', name: 'Intel Core i7-13700K', price: 409, brand: 'Intel', socket: 'LGA1700', image: 'https://placehold.co/100x100?text=i7' },
    { id: 'c3', name: 'AMD Ryzen 9 7950X', price: 599, brand: 'AMD', socket: 'AM5', image: 'https://placehold.co/100x100?text=R9' },
    { id: 'c4', name: 'AMD Ryzen 7 7800X3D', price: 449, brand: 'AMD', socket: 'AM5', image: 'https://placehold.co/100x100?text=R7' },
  ],
  motherboard: [
    { id: 'm1', name: 'ASUS ROG Maximus Z790', price: 699, brand: 'ASUS', socket: 'LGA1700', formFactor: 'ATX', image: 'https://placehold.co/100x100?text=Z790' },
    { id: 'm2', name: 'MSI MPG Z790 Carbon', price: 479, brand: 'MSI', socket: 'LGA1700', formFactor: 'ATX', image: 'https://placehold.co/100x100?text=MSI' },
    { id: 'm3', name: 'Gigabyte X670E AORUS', price: 499, brand: 'Gigabyte', socket: 'AM5', formFactor: 'ATX', image: 'https://placehold.co/100x100?text=X670' },
    { id: 'm4', name: 'ASUS ROG Strix B650-I', price: 329, brand: 'ASUS', socket: 'AM5', formFactor: 'Mini-ITX', image: 'https://placehold.co/100x100?text=ITX' },
  ],
  cpuCooler: [
    { id: 'cool1', name: 'Corsair H150i Elite', price: 189, supportedSockets: ['LGA1700', 'AM5'], image: 'https://placehold.co/100x100?text=AIO' },
    { id: 'cool2', name: 'Noctua NH-D15', price: 109, supportedSockets: ['LGA1700', 'AM5'], image: 'https://placehold.co/100x100?text=Noctua' },
    { id: 'cool3', name: 'Cooler Master Hyper 212', price: 49, supportedSockets: ['LGA1200', 'AM4'], image: 'https://placehold.co/100x100?text=212' }, // Intentional incompatibility for test
  ],
  ram: [
    { id: 'r1', name: 'G.Skill Trident Z5 RGB 32GB', price: 159, type: 'DDR5', speed: '6000MHz', image: 'https://placehold.co/100x100?text=RAM' },
    { id: 'r2', name: 'Corsair Vengeance 32GB', price: 139, type: 'DDR5', speed: '5600MHz', image: 'https://placehold.co/100x100?text=RAM' },
  ],
  gpu: [
    { id: 'g1', name: 'NVIDIA GeForce RTX 4090', price: 1599, brand: 'NVIDIA', memory: '24GB', image: 'https://placehold.co/100x100?text=4090' },
    { id: 'g2', name: 'NVIDIA GeForce RTX 4080', price: 1199, brand: 'NVIDIA', memory: '16GB', image: 'https://placehold.co/100x100?text=4080' },
    { id: 'g3', name: 'AMD Radeon RX 7900 XTX', price: 999, brand: 'AMD', memory: '24GB', image: 'https://placehold.co/100x100?text=7900XTX' },
  ],
  storage: [
    { id: 's1', name: 'Samsung 990 Pro 2TB', price: 179, type: 'NVMe SSD', image: 'https://placehold.co/100x100?text=SSD' },
    { id: 's2', name: 'WD Black SN850X 2TB', price: 159, type: 'NVMe SSD', image: 'https://placehold.co/100x100?text=SSD' },
  ],
  psu: [
    { id: 'p1', name: 'Corsair RM1000x', price: 189, watts: '1000W', rating: '80+ Gold', image: 'https://placehold.co/100x100?text=PSU' },
    { id: 'p2', name: 'Seasonic Vertex GX-1000', price: 219, watts: '1000W', rating: '80+ Gold', image: 'https://placehold.co/100x100?text=PSU' },
  ],
  case: [
    { id: 'ca1', name: 'Lian Li O11 Dynamic', price: 139, type: 'ATX Mid Tower', supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'], image: 'https://placehold.co/100x100?text=O11' },
    { id: 'ca2', name: 'Corsair 4000D Airflow', price: 104, type: 'ATX Mid Tower', supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'], image: 'https://placehold.co/100x100?text=4000D' },
    { id: 'ca3', name: 'Fractal Terra', price: 179, type: 'Mini-ITX', supportedMotherboards: ['Mini-ITX'], image: 'https://placehold.co/100x100?text=Terra' },
  ],
  monitor: [
    { id: 'mo1', name: 'LG 27GP950-B', price: 799, res: '4K', hz: '144Hz', image: 'https://placehold.co/100x100?text=LG' },
    { id: 'mo2', name: 'Alienware AW3423DW', price: 1199, res: 'UWQHD', hz: '175Hz', image: 'https://placehold.co/100x100?text=AW' },
  ],
  keyboard: [
    { id: 'kb1', name: 'Keychron Q1 Pro', price: 199, switch: 'Red', image: 'https://placehold.co/100x100?text=Keychron' },
    { id: 'kb2', name: 'Logitech G915 TKL', price: 229, switch: 'Tactile', image: 'https://placehold.co/100x100?text=G915' },
  ],
  mouse: [
    { id: 'ms1', name: 'Logitech G Pro X Superlight', price: 149, dpi: '25K', image: 'https://placehold.co/100x100?text=GPro' },
    { id: 'ms2', name: 'Razer Viper V2 Pro', price: 149, dpi: '30K', image: 'https://placehold.co/100x100?text=Viper' },
  ]
};

export const CATEGORIES = {
  cpu: 'CPU',
  cpuCooler: 'CPU Cooler',
  motherboard: 'Motherboard',
  ram: 'Memory',
  gpu: 'Video Card',
  storage: 'Storage',
  psu: 'Power Supply',
  case: 'Case',
  monitor: 'Monitor',
  keyboard: 'Keyboard',
  mouse: 'Mouse'
};
