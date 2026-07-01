# DevStack

DevStack is a lightweight web application for generating Docker-based development environments.

The goal is simple: let developers choose the technologies they need and receive a valid `docker-compose.yml` file without writing Docker configuration by hand.

## What Problem Does DevStack Solve?

Setting up a local development environment can be repetitive, error-prone, and time-consuming. Developers often need the same building blocks again and again: PHP, a database, Redis, phpMyAdmin, and other supporting services.

DevStack aims to make that process faster and more consistent by providing a small, focused interface for generating ready-to-use Docker Compose configurations.

The MVP focuses on the most common PHP development stacks while keeping the architecture clean and easy to extend.

## Planned MVP Features

- Select a technology stack.
- Select a PHP version.
- Select a database.
- Enable or disable Redis.
- Enable or disable phpMyAdmin.
- Generate a valid `docker-compose.yml` file.
- Copy or download the generated configuration.

## Roadmap

### MVP

- Basic web interface.
- PHP version selector.
- Database selector.
- Redis option.
- phpMyAdmin option.
- Docker Compose YAML generation.

### Future Improvements

- Support for more services such as Mailpit, RabbitMQ, Elasticsearch, and Meilisearch.
- Presets for common stacks.
- Custom ports and container names.
- `.env` file generation.
- Dockerfile generation.
- Downloadable project ZIP files.
- Validation and warnings for incompatible options.
- Saved stack templates.

## Technologies

DevStack is intentionally built with a simple and maintainable stack:

- PHP 8.4
- TailwindCSS
- Native JavaScript
- Composer autoloading
- Docker Compose

DevStack does not use:

- React
- Laravel
- Symfony as an application framework

Small standalone packages may be added when they solve a specific problem without introducing unnecessary complexity.

## Project Structure

```txt
devstack/
├── public/
├── src/
├── views/
├── templates/
├── storage/
├── composer.json
├── .gitignore
└── README.md
```

## Contributing

Contributions are welcome.

If you want to contribute:

1. Fork the repository.
2. Create a new branch for your change.
3. Keep the code simple, readable, and focused.
4. Avoid introducing large frameworks or unnecessary dependencies.
5. Submit a pull request with a clear description of the change.

Before opening a pull request, please make sure your changes are aligned with the project goals:

- Keep the architecture lightweight.
- Prefer clean PHP over framework-specific abstractions.
- Keep the user interface simple and practical.
- Make new stack options easy to maintain and extend.

## License

This project is intended to be released under the MIT License.

The license file will be added before the first public release.
