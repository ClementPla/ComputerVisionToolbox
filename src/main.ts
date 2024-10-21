import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'echarts-gl';
import { AppModule } from './app/app.module';
import { env } from 'onnxruntime-web';

env.wasm.wasmPaths = {
  wasm: 'assets/models/ort-wasm-simd-threaded.wasm',
  mjs: 'assets/models/ort-wasm-simd-threaded-simd.mjs',
}
platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
