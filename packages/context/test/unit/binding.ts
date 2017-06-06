// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {Binding, Context, Provider} from '../..';

const key = 'foo';

describe('Binding', () => {
  let ctx: Context;
  let binding: Binding;
  beforeEach(givenBinding);

  describe('constructor', () => {
    it('sets the given key', () => {
      const result = binding.key;
      expect(result).to.equal(key);
    });

    it('sets the binding lock state to unlocked by default',  () => {
      expect(binding.isLocked).to.be.false();
    });
  });

  describe('lock', () => {
    it('locks the binding', () => {
      binding.lock();
      expect(binding.isLocked).to.be.true();
    });
  });

  describe('to(value)', () => {
    it('returns the value synchronously', () => {
      binding.to('value');
      expect(binding.getValue(ctx)).to.equal('value');
    });
  });

  describe('toProvider(provider)', () => {
    it('returns the value', () => {
      binding.toProvider(MyProvider);
      expect(binding.getValue(ctx)).to.equal(ctx);
    });
  });

  function givenBinding() {
    ctx = new Context();
    binding = new Binding(key);
  }

  class MyProvider implements Provider {
    value(ctx) {
      return ctx;
    }
  }
});
