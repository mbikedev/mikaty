import { describe, it, expect } from 'vitest';
import { getLocalizedPath, getEnglishPath, pathTranslations } from '../src/lib/route_utils';

describe('Route Utilities', () => {
  describe('pathTranslations', () => {
    it('should have valid path mappings', () => {
      expect(pathTranslations).toBeDefined();
      expect(typeof pathTranslations).toBe('object');
      
      // Check that all paths are strings and start with '/'
      Object.entries(pathTranslations).forEach(([enPath, frPath]) => {
        expect(typeof enPath).toBe('string');
        expect(typeof frPath).toBe('string');
        expect(enPath.startsWith('/')).toBe(true);
        expect(frPath.startsWith('/')).toBe(true);
      });
    });
  });

  describe('getLocalizedPath', () => {
    it('should return French path when language is French', () => {
      expect(getLocalizedPath('/', 'fr')).toBe('/accueil');
      expect(getLocalizedPath('/contact', 'fr')).toBe('/contact');
      expect(getLocalizedPath('/services/digital-card', 'fr')).toBe('/services/carte-digitale');
    });

    it('should return original path when language is English', () => {
      expect(getLocalizedPath('/', 'en')).toBe('/');
      expect(getLocalizedPath('/contact', 'en')).toBe('/contact');
      expect(getLocalizedPath('/services/digital-card', 'en')).toBe('/services/digital-card');
    });

    it('should return original path for unmapped routes', () => {
      expect(getLocalizedPath('/unknown-path', 'fr')).toBe('/unknown-path');
    });
  });

  describe('getEnglishPath', () => {
    it('should convert French path back to English', () => {
      expect(getEnglishPath('/accueil', 'fr')).toBe('/');
      expect(getEnglishPath('/services/carte-digitale', 'fr')).toBe('/services/digital-card');
    });

    it('should return original path when language is English', () => {
      expect(getEnglishPath('/', 'en')).toBe('/');
      expect(getEnglishPath('/contact', 'en')).toBe('/contact');
    });

    it('should return original path for unmapped routes', () => {
      expect(getEnglishPath('/chemin-inconnu', 'fr')).toBe('/chemin-inconnu');
    });
  });
}); 