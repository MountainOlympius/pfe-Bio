-- Phylum => "embranchement"

CREATE TABLE IF NOT EXISTS phylum (
    id SERIAL PRIMARY KEY,
    name VARCHAR (200) NOT NULL UNIQUE,
    description TEXT,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Family related tables

CREATE TABLE IF NOT EXISTS family (
    id SERIAL PRIMARY KEY,
    name VARCHAR (200) NOT NULL UNIQUE,
    description TEXT,
    phylum_id INTEGER NOT NULL REFERENCES phylum (id) ON DELETE CASCADE,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS family_criteria (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    family_id INTEGER NOT NULL REFERENCES family (id) ON DELETE CASCADE,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Genus related tables
-- Genus => "genre"

CREATE TABLE IF NOT EXISTS genus (
    id SERIAL PRIMARY KEY,
    name VARCHAR (200) NOT NULL UNIQUE,
    description TEXT,
    family_id INTEGER NOT NULL REFERENCES family (id) ON DELETE CASCADE,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS genus_criteria (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    genus_id INTEGER NOT NULL REFERENCES genus (id) ON DELETE CASCADE,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- species 

CREATE TABLE IF NOT EXISTS species (
    id SERIAL PRIMARY KEY,
    name VARCHAR (200) NOT NULL UNIQUE,
    description TEXT,
    genus_id INTEGER NOT NULL REFERENCES genus (id) ON DELETE CASCADE,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS species_criteria (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    species_id INTEGER NOT NULL REFERENCES species (id) ON DELETE CASCADE,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS species_image (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    species_id INTEGER NOT NULL REFERENCES species (id) ON DELETE CASCADE
);