async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Client, Technician, Category],
    synchronize: true,
  });
  await dataSource.initialize();
  const userRepo = dataSource.getRepository(User);
  const clientRepo = dataSource.getRepository(Client);
  const techRepo = dataSource.getRepository(Technician);
  const catRepo = dataSource.getRepository(Category);

  await userRepo.save([
    { name: 'Admin', email: 'admin@tech.com', password: await bcrypt.hash('admin123', 10), role: 'admin' },
  ]);

  await clientRepo.save([
    { name: 'Client A', company: 'ACME', contactEmail: 'a@acme.com' },
  ]);

  await techRepo.save([
    { name: 'Tech A', specialty: 'Hardware', availability: true },
  ]);

  await catRepo.save([
    { name: 'Hardware Incident', description: 'Hardware related issues' },
    { name: 'Software Incident', description: 'Software related issues' },
    { name: 'Request', description: 'General request' },
  ]);

  await dataSource.destroy();
}
seed();