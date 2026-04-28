require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });
const { db } = require("../src/lib/db");
const { categories, summaries } = require("../src/db/schema");
const { eq } = require("drizzle-orm");

async function seed() {
  try {
    const allCats = await db.query.categories.findMany();
    
    const data = [
      {
        catName: 'Engenharia de Software',
        topics: [
          { title: 'SOLID: Os 5 Princípios', slug: 'solid-principios', content: '# SOLID\n\nTexto sobre SOLID...', isPremium: true, weight: 95 },
          { title: 'Design Patterns GoF', slug: 'design-patterns-gof', content: '# Design Patterns\n\nTexto sobre padrões...', isPremium: true, weight: 90 },
          { title: 'DDD: Domain Driven Design', slug: 'ddd-guide', content: '# DDD\n\nTexto sobre DDD...', isPremium: true, weight: 85 },
          { title: 'Testes Unitários e Mocking', slug: 'testes-unitarios', content: '# Testes\n\nTexto sobre testes...', isPremium: false, weight: 80 },
          { title: 'Clean Code: Melhores Práticas', slug: 'clean-code-best-practices', content: '# Clean Code\n\nTexto sobre código limpo...', isPremium: true, weight: 88 }
        ]
      },
      {
        catName: 'Redes de Computadores',
        topics: [
          { title: 'Modelo OSI: As 7 Camadas', slug: 'modelo-osi', content: '# Modelo OSI\n\nTexto sobre OSI...', isPremium: false, weight: 98 },
          { title: 'Protocolo TCP/IP', slug: 'tcp-ip-protocol', content: '# TCP/IP\n\nTexto sobre TCP/IP...', isPremium: true, weight: 95 },
          { title: 'DNS e Resolução de Nomes', slug: 'dns-how-it-works', content: '# DNS\n\nTexto sobre DNS...', isPremium: true, weight: 70 },
          { title: 'HTTP/HTTPS e Certificados', slug: 'http-https-tls', content: '# HTTP\n\nTexto sobre HTTP...', isPremium: true, weight: 85 },
          { title: 'IPV6: A Nova Internet', slug: 'ipv6-guide', content: '# IPV6\n\nTexto sobre IPv6...', isPremium: false, weight: 60 }
        ]
      },
      {
        catName: 'Banco de Dados',
        topics: [
          { title: 'Normalização: 1FN, 2FN e 3FN', slug: 'database-normalization', content: '# Normalização\n\nTexto sobre normalização...', isPremium: true, weight: 92 },
          { title: 'SQL: Queries Complexas e Joins', slug: 'sql-advanced-queries', content: '# SQL Avançado\n\nTexto sobre SQL...', isPremium: true, weight: 90 },
          { title: 'NoSQL: Quando usar MongoDB', slug: 'nosql-mongodb', content: '# NoSQL\n\nTexto sobre NoSQL...', isPremium: false, weight: 65 },
          { title: 'Transações ACID', slug: 'acid-transactions', content: '# ACID\n\nTexto sobre ACID...', isPremium: true, weight: 80 },
          { title: 'Índices e Performance', slug: 'db-indexing-performance', content: '# Índices\n\nTexto sobre índices...', isPremium: true, weight: 85 }
        ]
      },
      {
        catName: 'Segurança da Informação',
        topics: [
          { title: 'Criptografia Assimétrica', slug: 'asymmetric-cryptography', content: '# Criptografia\n\nTexto sobre criptografia...', isPremium: true, weight: 95 },
          { title: 'Firewalls e WAF', slug: 'firewalls-waf', content: '# Firewalls\n\nTexto sobre firewalls...', isPremium: false, weight: 75 },
          { title: 'Ataques: SQL Injection e XSS', slug: 'web-attacks-guide', content: '# Ataques Web\n\nTexto sobre ataques...', isPremium: true, weight: 98 },
          { title: 'Gestão de Identidade (IAM)', slug: 'iam-security', content: '# IAM\n\nTexto sobre IAM...', isPremium: true, weight: 80 },
          { title: 'ISO 27001: Fundamentos', slug: 'iso-27001-basics', content: '# ISO 27001\n\nTexto sobre ISO...', isPremium: true, weight: 85 }
        ]
      },
      {
        catName: 'Cloud Computing',
        topics: [
          { title: 'AWS: Principais Serviços', slug: 'aws-cloud-basics', content: '# AWS\n\nTexto sobre AWS...', isPremium: true, weight: 90 },
          { title: 'Docker e Containerização', slug: 'docker-containers-101', content: '# Docker\n\nTexto sobre Docker...', isPremium: false, weight: 95 },
          { title: 'Kubernetes: Orquestração', slug: 'kubernetes-k8s-guide', content: '# Kubernetes\n\nTexto sobre K8s...', isPremium: true, weight: 92 },
          { title: 'Serverless: AWS Lambda', slug: 'serverless-lambda', content: '# Serverless\n\nTexto sobre Serverless...', isPremium: true, weight: 70 },
          { title: 'Cloud Security Model', slug: 'shared-responsibility-cloud', content: '# Cloud Security\n\nTexto sobre segurança...', isPremium: true, weight: 85 }
        ]
      }
    ];

    console.log("Seeding data...");

    for (const item of data) {
      const category = allCats.find(c => c.name === item.catName);
      if (!category) {
        console.log(`Category ${item.catName} not found, skipping...`);
        continue;
      }

      for (const topic of item.topics) {
        // Check if exists
        const exists = await db.query.summaries.findFirst({
          where: eq(summaries.slug, topic.slug)
        });

        if (!exists) {
          await db.insert(summaries).values({
            title: topic.title,
            slug: topic.slug,
            categoryId: category.id,
            content: topic.content,
            shortDescription: `Aprenda tudo sobre ${topic.title} focado em concursos de alto nível.`,
            isPremium: topic.isPremium,
            relevanceWeight: topic.weight
          });
          console.log(`Added topic: ${topic.title}`);
        } else {
          console.log(`Topic already exists: ${topic.title}`);
        }
      }
    }

    console.log("Seed completed!");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

seed();
